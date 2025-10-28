# Получить текст соглашения userconsent.agreement.text

> Scope: [`userconsent`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `userconsent.agreement.text` возвращает текст соглашения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор соглашения.

Идентификатор можно получить с помощью метода [userconsent.agreement.list](./user-consent-agreement-list.md) ||
|| **replace** 
[`object`](../data-types.md) | Массив замен для подстановки текста. Доступные ключи:

- **button_caption** — текст кнопки подтверждения
- **fields** — список полей формы
  
Список доступных полей описан [ниже](#fields)

{% note info "" %}

Подстановка выполняется только для стандартных соглашений, созданных на основе шаблонов. Для пользовательских соглашений с произвольным HTML-текстом параметр игнорируется 

{% endnote %} ||
|#

## Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMPANY_NAME**
[`text`](../data-types.md) | Название компании ||
|| **COMPANY_ADDRESS**
[`text`](../data-types.md) | Адрес компании ||
|| **PURPOSES**
[`text`](../data-types.md) | Цель обработки данных ||
|| **THIRD_PARTIES**
[`text`](../data-types.md) | Третьи лица, которым передаются данные ||
|| **EMAIL**
[`string`](../data-types.md) | Адрес электронной почты ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":19,"replace":{"button_caption":"Я согласен","fields":{"COMPANY_NAME":"ООО Пример","COMPANY_ADDRESS":"г. Москва, ул. Примерная, д. 1","PURPOSES":"Обработка персональных данных для улучшения сервиса","THIRD_PARTIES":"Партнеры компании для аналитики","EMAIL":"info@example.com"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/userconsent.agreement.text
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":19,"replace":{"button_caption":"Я согласен","fields":{"COMPANY_NAME":"ООО Пример","COMPANY_ADDRESS":"г. Москва, ул. Примерная, д. 1","PURPOSES":"Обработка персональных данных для улучшения сервиса","THIRD_PARTIES":"Партнеры компании для аналитики","EMAIL":"info@example.com"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userconsent.agreement.text
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'userconsent.agreement.text',
            {
                id: 19,
                replace: {
                    button_caption: 'Я согласен',
                    fields: {
                        COMPANY_NAME: 'ООО Пример',
                        COMPANY_ADDRESS: 'г. Москва, ул. Примерная, д. 1',
                        PURPOSES: 'Обработка персональных данных для улучшения сервиса',
                        THIRD_PARTIES: 'Партнеры компании для аналитики',
                        EMAIL: 'info@example.com'
                    }
                }
            }
        );

        const result = response.getData().result;
        console.log('Result:', result);
        processResult(result);
    } catch (error) {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'userconsent.agreement.text',
                [
                    'id' => 19,
                    'replace' => [
                        'button_caption' => 'Я согласен',
                        'fields' => [
                            'COMPANY_NAME' => 'ООО Пример',
                            'COMPANY_ADDRESS' => 'г. Москва, ул. Примерная, д. 1',
                            'PURPOSES' => 'Обработка персональных данных для улучшения сервиса',
                            'THIRD_PARTIES' => 'Партнеры компании для аналитики',
                            'EMAIL' => 'info@example.com'
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'userconsent.agreement.text',
        {
            id: 19,
            replace: {
                button_caption: "Я согласен",
                fields: {
                    COMPANY_NAME: "ООО Пример",
                    COMPANY_ADDRESS: "г. Москва, ул. Примерная, д. 1",
                    PURPOSES: "Обработка персональных данных для улучшения сервиса",
                    THIRD_PARTIES: "Партнеры компании для аналитики",
                    EMAIL: "info@example.com"
                }
            }
        },
        function(result) {
            if(result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userconsent.agreement.text',
        [
            'id' => 19,
            'replace' => [
                'button_caption' => 'Я согласен',
                'fields' => [
                    'COMPANY_NAME' => 'ООО Пример',
                    'COMPANY_ADDRESS' => 'г. Москва, ул. Примерная, д. 1',
                    'PURPOSES' => 'Обработка персональных данных для улучшения сервиса',
                    'THIRD_PARTIES' => 'Партнеры компании для аналитики',
                    'EMAIL' => 'info@example.com'
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
"result": {
    "LABEL": "Нажимая кнопку «Я согласен», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных",
    "TEXT": "Согласие на обработку персональных данных\n\nНастоящим в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006 года свободно, своей волей и в своем интересе выражаю свое безусловное согласие на обработку моих персональных данных , зарегистрированным в соответствии с законодательством РФ по адресу: \n (далее по тексту - Оператор).\n1. Согласие дается на обработку одной, нескольких или всех категорий персональных данных, не являющихся специальными или биометрическими, предоставляемых мною, которые могут включать:\n\n- ООО Пример;\n- г. Москва, ул. Примерная, д. 1;\n- Обработка персональных данных для улучшения сервиса;\n- Партнеры компании для аналитики;\n- info@example.com.\n\n2. Оператор может совершать следующие действия: сбор; запись; систематизация; накопление; хранение; уточнение (обновление, изменение); извлечение; использование; блокирование; удаление; уничтожение. \n\n3. Способы обработки: как с использованием средств автоматизации, так и без их использования.\n\n4. Цель обработки: предоставление мне услуг/работ, включая, направление в мой адрес уведомлений, касающихся предоставляемых услуг/работ, подготовка и направление ответов на мои запросы, направление в мой адрес информации о мероприятиях/товарах/услугах/работах Оператора.\n\n5. В связи с тем, что Оператор может осуществлять обработку моих персональных данных посредством программы для ЭВМ «1С-Битрикс24», я даю свое согласие Оператору на осуществление соответствующего поручения ООО «1С-Битрикс», (ОГРН 5077746476209), зарегистрированному по адресу: 109544, г. Москва, б-р Энтузиастов, д. 2, эт.13, пом. 8-19.\n\n6. Настоящее согласие действует до момента его отзыва путем направления соответствующего уведомления на электронный адрес kalashnikova@bitrix.ru или направления по адресу .\n\n7. В случае отзыва мною согласия на обработку персональных данных Оператор вправе продолжить обработку персональных данных без моего согласия при наличии оснований, предусмотренных Федеральным законом №152-ФЗ «О персональных данных» от 27.07.2006 г."
},
"time": {
    "start": 1760611223,
    "finish": 1760611223.240694,
    "duration": 0.2406940460205078,
    "processing": 0,
    "date_start": "2025-10-16T13:40:23+03:00",
    "date_finish": "2025-10-16T13:40:23+03:00",
    "operating_reset_at": 1760611823,
    "operating": 0
}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Корневой элемент ответа ||
|| **LABEL**
[`string`](../data-types.md) | Заголовок соглашения ||
|| **TEXT**
[`string`](../data-types.md) | Текст соглашения ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"400",
    "error_description":"Parameter `Agreement ID` required."
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_ARGUMENT` | Parameter `Agreement ID` required | Параметр `id` не передан ||
|| `400` | `ERROR_ARGUMENT` | Agreement with id `999` not found | Соглашение с указанным `id` не найдено ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-consent-agreement-list.md)
- [{#T}](./user-consent-consent-add.md)