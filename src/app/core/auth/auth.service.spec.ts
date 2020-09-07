import { AuthService } from "./auth.service";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { UserService } from "../user/user.service";

describe('O service AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController; // para fazer as simulações de requisição
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService); // que vem com o AuthService
  });

  it('deve ser instanciado', () => {
    expect(service).toBeTruthy();
  });

  it('deve autenticar o usuário', fakeAsync(() => {
    const fakebody = {
      id: 1,
      nome: 'alvaro',
      email: 'alvaro@alura.com'
    };

    // simula a função setToken e a mesma retorna null
    // pq ele não foi na userService, então qualquer token é válido (teste já feito antes)
    // com isso ele não verifica o token fake criado aqui
    // não quero setar o token no localStorage
    const spy = spyOn(userService, 'setToken').and.returnValue(null);

    service.authenticate('alvaro', '1234').subscribe(response => {
      expect(response.body).toEqual(fakebody);
      // expect(response.headers.get('x-access-token')).toBe('tokenTest')
      // avaliar se as funções foram chamadas e não só o resultado delas
      expect(spy).toHaveBeenCalledWith("tokenTest")
    });

    // verifica se algum método deste teste executou uma requisição http (executado acima)
    // espera a chamada de UMA REQUISIÇÃO APENAS, e valida o header verificando o method

    /** O método httpMock.expectOne() retorna um objeto válido se as condições de chamada da
     *   requisição estiverem de acordo com as condições informadas nos parâmetros. */
    const request = httpMock.expectOne(req => {
      return req.method === 'POST';
    }, 'Verifica se o header da requisição é do tipo POST');

    // flush vai ser o retorno
    // o retorno vai ser isso abaixo (vai ser o response, o que tem abaixo)
    // doc:
    /** Resolva a solicitação retornando um corpo mais informações HTTP adicionais
     * (como cabeçalhos de resposta), se fornecido. Se a solicitação especificar um
     * tipo de corpo esperado, o corpo será convertido no tipo solicitado.
     * Caso contrário, o corpo é convertido em JSON por padrão. */
    request.flush(fakebody, {
      headers: { 'x-access-token': "tokenTest" }
    })

    // Simula a passagem assíncrona de tempo para os temporizadores na zona fakeAsync.
    tick();

  }));
});
