import mjml2html from 'mjml';
import Dirpath from 'path';

const options = {
  filePath: Dirpath.resolve(__dirname),
  beautify: true,
  minify: true,
};

export const recovery_password_template = async (email: string, code: string) =>
  mjml2html(
    `
      <mjml>
      <mj-head>
        <mj-title>Código para redefinição de senha</mj-title>
        <mj-include path="./shared/header.mjml" />
      </mj-head>
      <mj-body background-color="#FAFAFA">
        <mj-wrapper></mj-wrapper>
    
        <mj-wrapper css-class="container-title">
          <mj-section background-color="#31ad2c" padding="0">
            <mj-column width="35%">
              <mj-image
                src="https://res.cloudinary.com/apinodeteste/image/upload/v1611163844/Rebalanceei/rebalanceeiLogo_af9tlw.png"
                alt="Rebalanceeei"
              />
            </mj-column>
          </mj-section>
    
            <mj-section css-class="container-header" padding="12px 0">
            <mj-column width="93%" padding="0">
              <mj-divider
                border-width="1px"
                border-style="solid"
                border-color="orange"
              />
            </mj-column>
            <mj-column width="100%" padding="0 0">
              <mj-text
                align="center"
                font-size="22px"
                line-height="30px"
                font-weight="600"
              >
                Código para redefinição de senha
              </mj-text>
            </mj-column>
            <mj-column width="93%" padding="0">
              <mj-divider
                border-width="1px"
                border-style="solid"
                border-color="orange"
              />
            </mj-column>
          </mj-section>
    
          <mj-section css-class="container-content">
            <mj-column>
              <mj-text>Seja bem vindo,</mj-text>
              <mj-text>
              Foi solicitado uma troca de senha para o email: ${email}
              </mj-text>
              <mj-text>
                Favor insira o codigo abaixo no aplicativo para efetuar a troca da senha
              </mj-text>
              <mj-button
                width="100%"
              >
               ${code}
              </mj-button>
              <mj-text>
                Este código expira em 5 minutos, Caso não tenha sido você, favor desconsiderar
              </mj-text>
              <mj-text>Desejamos que tenha um excelente dia.</mj-text>
              <mj-text>Att. Equipe Rebalanceei</mj-text>
            </mj-column>
          </mj-section>
    
       <mj-section padding="20px 0" css-class="container-content">
          <mj-column>
            <mj-divider border-width="1px" border-style="solid" border-color="#E2E7EB" />
              <mj-text css-class="text-center" font-size="14px" line-height="19px" color="#485068">Este e-mail é enviado automaticamente. Precisa de ajuda? Fale com a gente
              através do <a href="mailto:rebalanceeiapp@gmail.com" target="_blank" rel="noopener noreferrer">rebalanceeiapp@gmail.com</a>
              </mj-text>
            </mj-column>  
        </mj-section>
    
        </mj-wrapper>
    
        <mj-include path="./shared/footer.mjml" />
      </mj-body>
    </mjml>   
`,
    options,
  );
