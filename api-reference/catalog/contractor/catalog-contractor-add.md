# Добавить поставщика catalog.contractor.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр и выбор склада»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.contractor.add` добавляет поставщика в справочник поставщиков Складского учета и возвращает его идентификатор.

{% note warning "" %}

Метод работает, только если поставщики Складского учета не перенесены в CRM. Если поставщиков ведет CRM, метод возвращает ошибку `This API has been deprecated and is no longer available`. В этом случае добавляйте поставщиков как компании и контакты CRM и привязывайте их к документам методами [catalog.document.contractor.*](../documentcontractor/index.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового поставщика. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **companyName***
[`string`](../../data-types.md) | Название компании поставщика. Поставщик создается как юридическое лицо. Пустое значение вызывает ошибку `Empty name` ||
|#

Другие поля в `fields` метод не сохраняет.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.contractor.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"companyName":"ООО «Поставка»"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.contractor.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"companyName":"ООО «Поставка»"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.contractor.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ContractorAddResult = {
      item: {
        id: number
        companyName: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ContractorAddResult>({
        method: 'catalog.contractor.add',
        params: {
          fields: {
            companyName: 'ООО «Поставка»',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contractor created:', result.item.id)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addContractor() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.contractor.add',
            params: {
              fields: {
                companyName: 'ООО «Поставка»',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Contractor created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addContractor)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.contractor.add(
            fields={
                "companyName": "ООО «Поставка»",
            },
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

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.contractor.add',
                [
                    'fields' => [
                        'companyName' => 'ООО «Поставка»',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'catalog.contractor.add',
        {
            fields: {
                companyName: 'ООО «Поставка»',
            },
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.contractor.add',
        [
            'fields' => [
                'companyName' => 'ООО «Поставка»',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.contractor.add", b24.Params{
    	"fields": b24.Params{
    		"companyName": "ООО «Поставка»",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.contractor.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID          int    `json:"id"`
    	CompanyName string `json:"companyName"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.CompanyName)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Формат успешного ответа приведен по коду метода: в облачном Битрикс24 метод возвращает ошибку.

```json
{
    "result": {
        "item": {
            "id": 5,
            "companyName": "ООО «Поставка»"
        }
    },
    "time": {
        "start": 1792665018,
        "finish": 1792665018.577496,
        "duration": 0.5774960517883301,
        "processing": 0,
        "date_start": "2026-10-22T13:30:18+03:00",
        "date_finish": "2026-10-22T13:30:18+03:00",
        "operating_reset_at": 1792665600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../data-types.md) | Данные созданного поставщика. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор поставщика ||
|| **companyName**
[`string`](../../data-types.md) | Название компании поставщика ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "This API has been deprecated and is no longer available"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `-` | Empty name | Передайте непустую строку в `companyName` ||
|| `-` | This API has been deprecated and is no longer available | Поставщики хранятся в CRM. Добавьте компанию или контакт CRM и привяжите к документу методом [catalog.documentcontractor.add](../documentcontractor/catalog-documentcontractor-add.md) ||
|| `-` | Error adding contractor | Поставщик не создан. Повторите запрос ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр и выбор склада» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-contractor-field-list.md)
- [{#T}](./catalog-contractor-field-get.md)
- [{#T}](./index.md)
- [{#T}](../documentcontractor/index.md)
