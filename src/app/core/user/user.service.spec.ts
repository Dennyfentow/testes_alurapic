import { UserService } from "./user.service";
import { TokenService } from "../token/token.service";
import { TestBed, inject } from "@angular/core/testing";

describe('O serviço UserService', () => {
  let service: UserService;

  // antes de cada teste, executar isso
  beforeEach(() => {
    // simula um módulo e injeta as dependencias automáticamente
    // um pouco mais lento, não precisei instanciar o TokenService
    // caso seja um service simples, não precisa usar o TestBed

    TestBed.configureTestingModule({
      providers: [UserService]
    });
    service = TestBed.get(UserService);
  });

  // it('deve ser instanciado', () => {
  //   expect(service).toBeTruthy();
  // });

  it('deve ser criado', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }))

  it('deve, através de um token, recuperar as informações do usuário', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU5OTEwMjI4OCwiZXhwIjoxNTk5MTg4Njg4fQ.ntpQO0Ivk-N49o9l3z7jfQdxEDsl-Y4JeUd6WKINMnM";
    service.setToken(token);
    expect(service.isLogged()).toBeTruthy();
    expect(service.getUserName()).toBe("flavio");
    service.getUser().subscribe(user => {
      expect(user.name).toBe("flavio");
    });
  });

  it('deve limpar as informações no logout', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTU5OTEwMjI4OCwiZXhwIjoxNTk5MTg4Njg4fQ.ntpQO0Ivk-N49o9l3z7jfQdxEDsl-Y4JeUd6WKINMnM";
    service.setToken(token);
    service.logout();
    expect(service.isLogged()).toBeFalsy();
    expect(service.getUserName()).toBe("");
  });
});
