
module.exports = function(email) {
  return `
    <html>
      <head>
      </head>
      <body style="background-color: #f0f0f0;">

        <table width="100%" style="max-width: 560px; margin: 20px auto; font-family: Arial, Helvetica, sans-serif;">
          <tbody>
            <tr>
              <td align="center" style="padding-top: 40px">
                <a href="https://www.bibcongress.ru" target="_blank">
                  <img
                    src="https://www.bibcongress.ru/_nuxt/assets/img/logo_color.png"
                    alt="Международный библиографический конгресс"
                    width="40%"
                  />
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%" style="margin-top: 25px; padding: 25px; background: #fff; border-radius: 5px;">
                  <tr>
                    <td style="font-size: 24px; font-weight: bold; color: #000">
                      Почти готово...
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 20px; font-size: 16px; line-height: 160%; color: #000">
                      Мы рады, что вы присоединились к числу участников
                      III Международного библиографического конгресса.
                      До успешной регистрации остался всего один шаг.
                      Пожалуйста, подтвердите вашу электронную почту:
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 20px;">
                      <a href="https://api.bibcongress.ru/email-confirm/${email}">
                        <table width="100%" style="max-width: 240px; margin: 0 auto;">
                          <tr>
                            <td align="center" style="padding: 12px 24px; background: rgb(7, 39, 141); border-radius: 4px;">
                              <a href="https://api.bibcongress.ru/email-confirm/${email}" style="color: #fff; font-size: 17px; line-height: 120%;" target="_blank">Подтвердить E-Mail</a>
                            </td>
                          </tr>
                        </table>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 20px; font-size: 16px; line-height: 160%; color: #000">
                      Нам важно оставаться с вами на связи:
                      на этот адрес мы будем присылать обновления
                      в программе Конгресса, информацию о докладах
                      и другие организационные моменты
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 20px; font-size: 16px; line-height: 160%; color: #000">
                      Чтобы письма не попадали в папку Спам, добавьте наш адрес в список контактов.
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 20px; font-size: 16px; line-height: 160%; color: #000">
                      После подтверждения почты вы можете также подать
                      заявку на доклад, добавлять и редактировать
                      информацию о себе в личном кабинете
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 20px; padding-bottom: 20px; font-size: 13px; line-height: 150%; color: #999999;">
                Вы получили это письмо, так как указали этот адрес при регистрации на
                <a href="https://www.bibcongress.ru" style="text-decoration: none; color: inherit" target="_blank">https://www.bibcongress.ru</a>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
  </html>
  `;
}