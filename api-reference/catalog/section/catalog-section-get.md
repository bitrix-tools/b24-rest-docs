# Получить значения полей раздела торгового каталога catalog.section.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Просмотр товаров каталога» и правом на чтение раздела в инфоблоке

Метод `catalog.section.get` возвращает значения полей раздела торгового каталога по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_section.id`](../data-types.md#catalog_section) | Идентификатор раздела каталога ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id": 31}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.section.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id": 31, "auth": "**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.section.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CatalogSectionGetResult = {
      section: {
        active: string
        code: string | null
        description: string
        descriptionType: string
        iblockId: number
        iblockSectionId: number | null
        id: number
        name: string
        sort: number
        xmlId: string | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CatalogSectionGetResult>({
        method: 'catalog.section.get',
        params: {
          id: 31,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.section.id, result.section.name)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getCatalogSection() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.section.get',
            params: {
              id: 31,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.section.id, result.section.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCatalogSection)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.section.get(
            bitrix_id=31,
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

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.section.get',
                [
                    'id' => 31
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

    ```js
    BX24.callMethod(
        'catalog.section.get',
        {
            id: 31
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.section.get',
        [
            'id' => 31
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.section.get", b24.Params{
    	"id": 31,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.section.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "section".
    raw, ok := b24.Unwrap(res.Result, "section")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа section")
    }

    var item struct {
    	Active          string `json:"active"`
    	Code            string `json:"code"`
    	Description     string `json:"description"`
    	DescriptionType string `json:"descriptionType"`
    	IblockID        b24.ID `json:"iblockId"`
    	IblockSectionID b24.ID `json:"iblockSectionId"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Active, item.Code)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "section": {
            "active": "Y",
            "code": "clothes",
            "description": null,
            "descriptionType": "text",
            "iblockId": 25,
            "iblockSectionId": null,
            "id": 31,
            "name": "Одежда",
            "sort": 50,
            "xmlId": "clothes-01"
        }
    },
    "time": {
        "start": 1793615591,
        "finish": 1793615591.776121,
        "duration": 0.7761209011077881,
        "processing": 0,
        "date_start": "2026-11-02T13:33:11+03:00",
        "date_finish": "2026-11-02T13:33:11+03:00",
        "operating_reset_at": 1793616180,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.section**
[`catalog_section`](../data-types.md#catalog_section) | Объект с информацией о разделе каталога с заданным идентификатором ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "200040300040",
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | Access Denied | Нет права «Просмотр каталога товаров» или «Просмотр товаров каталога» ||
|| `400` | `200040300040` | Access Denied | Нет права на чтение раздела в инфоблоке или раздела с указанным `id` не существует ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-section-add.md)
- [{#T}](./catalog-section-update.md)
- [{#T}](./catalog-section-list.md)
- [{#T}](./catalog-section-delete.md)
- [{#T}](./catalog-section-get-fields.md)
