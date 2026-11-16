# Сбросить параметры карточки crm.contact.details.configuration.reset

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
>  - любой пользователь может сбросить свои личные настройки
>  - пользователь с правом «Управление общим видом карточки» или «Разрешить изменять настройки» в CRM может сбросить общие настройки
>  - пользователь с правом «Разрешить изменять настройки» в CRM может сбросить чужие личные настройки

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.details.configuration.reset](../../universal/item-details-configuration/crm-item-details-configuration-reset.md).

{% endnote %}

Метод `crm.contact.details.configuration.reset` сбрасывает настройки карточки контакта: удаляет личные настройки карточки указанного пользователя или общие настройки, заданные для всех пользователей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек.

Возможные значения:
- **P** — личные настройки
- **C** — общие настройки

По умолчанию — `P`. Любое значение, кроме `C`, выбирает личные настройки `P`
||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя. Нужен только при сбросе личных настроек.

Если параметр не задан или его значение после преобразования в целое число меньше либо равно нулю, используется идентификатор текущего пользователя
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. Сбросить общую конфигурацию

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"C"}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.details.configuration.reset
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"C","auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.contact.details.configuration.reset
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            'crm.contact.details.configuration.reset',
            {
                scope: "C",
            },
            (result) => {
                result.error()
                    ? console.error(result.error())
                    : console.info(result.data())
                ;
            },
        );
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.contact.details.configuration.reset',
            [
                'scope' => 'C'
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - Go

        ```go
        // client и ctx уже созданы — см. раздел «SDK для Go»
        res, err := client.Core().Call(ctx, "crm.contact.details.configuration.reset", b24.Params{
        	"scope": "C",
        })
        if err != nil {
        	return fmt.Errorf("crm.contact.details.configuration.reset: %w", err)
        }

        var ok bool
        if err := json.Unmarshal(res.Result, &ok); err != nil {
        	return fmt.Errorf("разбор ответа: %w", err)
        }
        fmt.Println("выполнено:", ok)
        ```

    {% endlist %}

2. Сбросить личную конфигурацию

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":6}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.details.configuration.reset
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":6,"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.contact.details.configuration.reset
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            'crm.contact.details.configuration.reset',
            {
                scope: "P",
                userId: 6,
            },
            (result) => {
                result.error()
                    ? console.error(result.error())
                    : console.info(result.data())
                ;
            },
        );
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.contact.details.configuration.reset',
            [
                'scope' => 'P',
                'userId' => 6
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.crm.contact.details.configuration.reset(
                scope="P",
                user_id=6,
            ).response
            result = bitrix_response.result
            print(result)
        except BitrixAPIError as error:
            print(
                "Ошибка Bitrix API",
                f"error: {error.error}",
                f"error_description: {error.error_description}",
                sep="\n",
            )
        except BitrixSDKException as error:
            print(f"Ошибка Bitrix SDK: {error.message}")
        except Exception as error:
            print(f"Непредвиденная ошибка: {error}")
        ```

    - Go

        ```go
        // client и ctx уже созданы — см. раздел «SDK для Go»
        res, err := client.Core().Call(ctx, "crm.contact.details.configuration.reset", b24.Params{
        	"scope":  "P",
        	"userId": 6,
        })
        if err != nil {
        	return fmt.Errorf("crm.contact.details.configuration.reset: %w", err)
        }

        var ok bool
        if err := json.Unmarshal(res.Result, &ok); err != nil {
        	return fmt.Errorf("разбор ответа: %w", err)
        }
        fmt.Println("выполнено:", ok)
        ```

    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1724682584.069094,
        "finish": 1724682584.38436,
        "duration": 0.31526613235473633,
        "processing": 0.025727033615112305,
        "date_start": "2024-08-26T16:29:44+02:00",
        "date_finish": "2024-08-26T16:29:44+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа.

Метод возвращает `true`, если при сбросе не возникло ошибки. Значение не подтверждает, что сохраненные настройки существовали ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Access denied. | У пользователя нет права сбросить выбранные настройки карточки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-contact-details-configuration-get.md)
- [{#T}](./crm-contact-details-configuration-set.md)
- [{#T}](./crm-contact-details-configuration-force-common-scope-for-all.md)
