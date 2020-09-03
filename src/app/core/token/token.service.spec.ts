import { TokenService } from "./token.service";

describe('O serviço TokenService', () => {
  let token;
  let service;

  it('deve ser instaciado', () => {
    // smoke test - verificar se a classe pode ser instanciada
    const service = new TokenService(); // execução na preparação
    expect(service).toBeTruthy(); // avaliação
  });

  it('deve guardar um token', () => {
    service.setToken(token);
    expect(service.hasToken()).toBeTruthy();
    expect(service.getToken()).toBe(token);

  });

  it('deve remover um token', () => {
    service.setToken(token);

    service.removeToken();

    expect(service.hasToken()).toBeFalsy();
    expect(service.getToken()).toBeFalsy();
  });


  // depois de cada teste, executa isso
  afterEach(() => {
    localStorage.clear();
  });

  // executar antes de cada teste, executa isso
  beforeEach(() => {
    token = 'testetoken';
    service = new TokenService();

  });
})
