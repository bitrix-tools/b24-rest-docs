# Получить поля, доступные для добавления в шаблон реквизитов crm.requisite.preset.field.availabletoadd

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает поля, доступные для добавления в указанный шаблон реквизитов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **preset***
[`object`](../../../../data-types.md) | Объект, содержащий значение идентификатора шаблона, для которого нужно получить список доступных для добавления настраиваемых полей. 

Идентификаторы шаблонов можно получить с помощью метода [crm.requisite.preset.list](../crm-requisite-preset-list.md). 

Поля с префиксом `UF_` в ответе являются пользовательскими (смотрите [методы](../../user-fields/index.md) для работы с пользовательскими полями реквизитов) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"preset":{"ID":27}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.preset.field.availabletoadd
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"preset":{"ID":27},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.field.availabletoadd
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.preset.field.availabletoadd",
    		{
    			preset:
    			{
    				"ID": 27
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.preset.field.availabletoadd',
                [
                    'preset' => [
                        'ID' => 27
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error checking available fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.field.availabletoadd",
        {
            preset:
            {
                "ID": 27
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.preset.field.availabletoadd',
        [
            'preset' => ['ID' => 27]
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
    "result": [
        "RQ_FIRST_NAME",
        "RQ_LAST_NAME",
        "RQ_SECOND_NAME",
        "RQ_COMPANY_NAME",
        "RQ_COMPANY_FULL_NAME",
        "RQ_COMPANY_REG_DATE",
        "RQ_DIRECTOR",
        "RQ_ACCOUNTANT",
        "RQ_ADDR",
        "RQ_CONTACT",
        "RQ_EMAIL",
        "RQ_PHONE",
        "RQ_FAX",
        "RQ_IDENT_DOC",
        "RQ_IDENT_DOC_SER",
        "RQ_IDENT_DOC_NUM",
        "RQ_IDENT_DOC_DATE",
        "RQ_IDENT_DOC_ISSUED_BY",
        "RQ_IDENT_DOC_DEP_CODE",
        "RQ_INN",
        "RQ_KPP",
        "RQ_IFNS",
        "RQ_OGRN",
        "RQ_OGRNIP",
        "RQ_OKPO",
        "RQ_OKTMO",
        "RQ_OKVED",
        "RQ_ST_CERT_SER",
        "RQ_ST_CERT_NUM",
        "RQ_ST_CERT_DATE",
        "RQ_SIGNATURE",
        "RQ_STAMP",
        "UF_CRM_1707997209",
        "UF_CRM_1707997236",
        "UF_CRM_1707997253",
        "UF_CRM_1708012333"
    ]
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../../data-types.md) | Массив с названиями полей, которые можно добавить в указанный шаблон реквизитов ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Описание полей

#|
|| **Название**
`тип` | **Описание** ||
|| **RQ_FIRST_NAME**
[`string`](../../../../data-types.md) | Имя ||
|| **RQ_LAST_NAME**
[`string`](../../../../data-types.md) | Фамилия ||
|| **RQ_SECOND_NAME**
[`string`](../../../../data-types.md) | Отчество ||
|| **RQ_COMPANY_NAME**
[`string`](../../../../data-types.md) | Сокращенное наименование организации ||
|| **RQ_COMPANY_FULL_NAME**
[`string`](../../../../data-types.md) | Полное наименование организации ||
|| **RQ_COMPANY_REG_DATE**
[`string`](../../../../data-types.md) | Дата государственной регистрации ||
|| **RQ_DIRECTOR**
[`string`](../../../../data-types.md) | Генеральный директор ||
|| **RQ_ACCOUNTANT**
[`string`](../../../../data-types.md) | Главный бухгалтер ||
|| **RQ_CONTACT**
[`string`](../../../../data-types.md) | Контактное лицо ||
|| **RQ_EMAIL**
[`string`](../../../../data-types.md) | E-Mail ||
|| **RQ_PHONE**
[`string`](../../../../data-types.md) | Телефон ||
|| **RQ_FAX**
[`string`](../../../../data-types.md) | Факс ||
|| **RQ_IDENT_DOC**
[`string`](../../../../data-types.md) | Вид документа ||
|| **RQ_IDENT_DOC_SER**
[`string`](../../../../data-types.md) | Серия ||
|| **RQ_IDENT_DOC_NUM**
[`string`](../../../../data-types.md) | Номер ||
|| **RQ_IDENT_DOC_DATE**
[`string`](../../../../data-types.md) | Дата выдачи ||
|| **RQ_IDENT_DOC_ISSUED_BY**
[`string`](../../../../data-types.md) | Кем выдан ||
|| **RQ_IDENT_DOC_DEP_CODE**
[`string`](../../../../data-types.md) | Код подразделения ||
|| **RQ_INN**
[`string`](../../../../data-types.md) | ИНН ||
|| **RQ_KPP**
[`string`](../../../../data-types.md) | КПП ||
|| **RQ_IFNS**
[`string`](../../../../data-types.md) | ИФНС ||
|| **RQ_OGRN**
[`string`](../../../../data-types.md) | ОГРН ||
|| **RQ_OGRNIP**
[`string`](../../../../data-types.md) | ОГРНИП ||
|| **RQ_OKPO**
[`string`](../../../../data-types.md) | ОКПО ||
|| **RQ_OKTMO**
[`string`](../../../../data-types.md) | ОКТМО ||
|| **RQ_OKVED**
[`string`](../../../../data-types.md) | ОКВЭД ||
|| **RQ_ST_CERT_SER**
[`string`](../../../../data-types.md) | Серия свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_NUM**
[`string`](../../../../data-types.md) | Номер свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_DATE**
[`string`](../../../../data-types.md) | Дата свидетельства о государственной регистрации ||
|| **UF_CRM_1707997209**
[`double`](../../../../data-types.md) | Пользовательское поле типа «Число» ||
|| **UF_CRM_1707997236**
[`boolean`](../../../../data-types.md) | Пользовательское поле типа «Да/Нет» ||
|| **UF_CRM_1707997253**
[`datetime`](../../../../data-types.md) | Пользовательское поле типа «Дата» ||
|| **UF_CRM_1708012333**
[`string`](../../../../data-types.md) | Пользовательское поле типа «Строка» ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "Шаблон не найден."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `Шаблон не найден` | Не найден шаблон, для которого нужно получить список полей, доступных для добавления ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-field-add.md)
- [{#T}](./crm-requisite-preset-field-update.md)
- [{#T}](./crm-requisite-preset-field-get.md)
- [{#T}](./crm-requisite-preset-field-list.md)
- [{#T}](./crm-requisite-preset-field-delete.md)
- [{#T}](./crm-requisite-preset-field-fields.md)
