# Получить список доступных событий events

> Кто может выполнять метод: любой пользователь

Метод `events` возвращает общий список доступных событий.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SCOPE**
[`string`](../data-types.md) | Метод вернет события, принадлежащие указанному разрешению ||
|| **FULL**
[`boolean`](../data-types.md) | Метод вернет весь список событий. Параметр будет проигнорирован, если будет передан параметр `SCOPE` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    Пример №1

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "SCOPE": "user",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/events
    ```
    
    Пример №2
    
    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "FULL": true,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/events
    ```

- JS

    Пример №1

    ```js
    BX24.callMethod(
        "events",
        {
            "SCOPE": "user"
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
    
    Пример №2
    
    ```js
    BX24.callMethod(
        "events",
        {
            "FULL": true
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

- PHP

    Пример №1
    
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'events',
        [
            'SCOPE' => 'user'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

    Пример №2
    
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'events',
        [
            'FULL' => true
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
    "result":[
        "ONAPPUNINSTALL",
        "ONAPPINSTALL",
        "ONAPPUPDATE",
        "ONAPPPAYMENT",
        "ONAPPTEST",
        "ONAPPMETHODCONFIRM",
        "ONOFFLINEEVENT",
        "ONUSERADD",
        "ONCRMINVOICEADD",
        "ONCRMINVOICEUPDATE",
        "ONCRMINVOICEDELETE",
        "ONCRMINVOICESETSTATUS",
        "ONCRMLEADADD",
        "ONCRMLEADUPDATE",
        "ONCRMLEADDELETE",
        "ONCRMLEADUSERFIELDADD",
        "ONCRMLEADUSERFIELDUPDATE",
        "ONCRMLEADUSERFIELDDELETE",
        "ONCRMLEADUSERFIELDSETENUMVALUES",
        "ONCRMDEALADD",
        "ONCRMDEALUPDATE",
        "ONCRMDEALDELETE",
        "ONCRMDEALMOVETOCATEGORY",
        "ONCRMDEALUSERFIELDADD",
        "ONCRMDEALUSERFIELDUPDATE",
        "ONCRMDEALUSERFIELDDELETE",
        "ONCRMDEALUSERFIELDSETENUMVALUES",
        "ONCRMCOMPANYADD",
        "ONCRMCOMPANYUPDATE",
        "ONCRMCOMPANYDELETE",
        "ONCRMCOMPANYUSERFIELDADD",
        "ONCRMCOMPANYUSERFIELDUPDATE",
        "ONCRMCOMPANYUSERFIELDDELETE",
        "ONCRMCOMPANYUSERFIELDSETENUMVALUES",
        "ONCRMCONTACTADD",
        "ONCRMCONTACTUPDATE",
        "ONCRMCONTACTDELETE",
        "ONCRMCONTACTUSERFIELDADD",
        "ONCRMCONTACTUSERFIELDUPDATE",
        "ONCRMCONTACTUSERFIELDDELETE",
        "ONCRMCONTACTUSERFIELDSETENUMVALUES",
        "ONCRMQUOTEADD",
        "ONCRMQUOTEUPDATE",
        "ONCRMQUOTEDELETE",
        "ONCRMQUOTEUSERFIELDADD",
        "ONCRMQUOTEUSERFIELDUPDATE",
        "ONCRMQUOTEUSERFIELDDELETE",
        "ONCRMQUOTEUSERFIELDSETENUMVALUES",
        "ONCRMINVOICEUSERFIELDADD",
        "ONCRMINVOICEUSERFIELDUPDATE",
        "ONCRMINVOICEUSERFIELDDELETE",
        "ONCRMINVOICEUSERFIELDSETENUMVALUES",
        "ONCRMCURRENCYADD",
        "ONCRMCURRENCYUPDATE",
        "ONCRMCURRENCYDELETE",
        "ONCRMPRODUCTADD",
        "ONCRMPRODUCTUPDATE",
        "ONCRMPRODUCTDELETE",
        "ONCRMPRODUCTPROPERTYADD",
        "ONCRMPRODUCTPROPERTYUPDATE",
        "ONCRMPRODUCTPROPERTYDELETE",
        "ONCRMPRODUCTSECTIONADD",
        "ONCRMPRODUCTSECTIONUPDATE",
        "ONCRMPRODUCTSECTIONDELETE",
        "ONCRMACTIVITYADD",
        "ONCRMACTIVITYUPDATE",
        "ONCRMACTIVITYDELETE",
        "ONCRMREQUISITEADD",
        "ONCRMREQUISITEUPDATE",
        "ONCRMREQUISITEDELETE",
        "ONCRMREQUISITEUSERFIELDADD",
        "ONCRMREQUISITEUSERFIELDUPDATE",
        "ONCRMREQUISITEUSERFIELDDELETE",
        "ONCRMREQUISITEUSERFIELDSETENUMVALUES",
        "ONCRMBANKDETAILADD",
        "ONCRMBANKDETAILUPDATE",
        "ONCRMBANKDETAILDELETE",
        "ONCRMADDRESSREGISTER",
        "ONCRMADDRESSUNREGISTER",
        "ONCRMMEASUREADD",
        "ONCRMMEASUREUPDATE",
        "ONCRMMEASUREDELETE",
        "ONCRMDEALRECURRINGADD",
        "ONCRMDEALRECURRINGUPDATE",
        "ONCRMDEALRECURRINGDELETE",
        "ONCRMDEALRECURRINGEXPOSE",
        "ONCRMINVOICERECURRINGADD",
        "ONCRMINVOICERECURRINGUPDATE",
        "ONCRMINVOICERECURRINGDELETE",
        "ONCRMINVOICERECURRINGEXPOSE",
        "ONCRMTIMELINECOMMENTADD",
        "ONCRMTIMELINECOMMENTUPDATE",
        "ONCRMTIMELINECOMMENTDELETE",
        "ONCRMDYNAMICITEMADD",
        "ONCRMDYNAMICITEMUPDATE",
        "ONCRMDYNAMICITEMDELETE",
        "ONCRMDYNAMICITEMADD_147",
        "ONCRMDYNAMICITEMUPDATE_147",
        "ONCRMDYNAMICITEMDELETE_147",
        "ONCRMTYPEADD",
        "ONCRMTYPEUPDATE",
        "ONCRMTYPEDELETE",
        "ONCRMDOCUMENTGENERATORDOCUMENTADD",
        "ONCRMDOCUMENTGENERATORDOCUMENTUPDATE",
        "ONCRMDOCUMENTGENERATORDOCUMENTDELETE",
        "ONTASKADD",
        "ONTASKUPDATE",
        "ONTASKDELETE",
        "ONTASKCOMMENTADD",
        "ONTASKCOMMENTUPDATE",
        "ONTASKCOMMENTDELETE"
    ]
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./event-bind.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)
