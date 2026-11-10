# Отвязать Базу знаний от меню landing.site.unbindingFromMenu

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр» в разделе «Сайты» и правом «Размещение в Расширениях» в разделе «База знаний»

Метод `landing.site.unbindingFromMenu` отвязывает Базу знаний от указанного меню. Привязки этой Базы знаний к другим меню и сама База знаний сохраняются.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../../data-types.md) | Идентификатор сайта Базы знаний.

`id` можно получить:
- в поле `ENTITY_ID` метода [landing.site.getMenuBindings](./landing-site-get-menu-bindings.md)
- в поле `ID` методом [landing.site.getList](../../site/landing-site-get-list.md#type-scope) с параметром `scope: "KNOWLEDGE"` — без него `landing.site.getList` не возвращает Базы знаний ||
|| **menuCode**^*^
[`string`](../../../data-types.md) | Код меню.

`menuCode` можно получить:
- в интерфейсе через пункт «Выбрать Базу знаний»: в URL открывшегося фрейма параметр `menuId` содержит код меню, например `menuId=crm_switcher:deal`
- из результата метода [landing.site.getMenuBindings](./landing-site-get-menu-bindings.md) в поле `BINDING_ID` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример отвязки Базы знаний от меню, где:
- `id` — идентификатор сайта Базы знаний
- `menuCode` — код меню

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 31,
        "menuCode": "crm_switcher:deal"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.unbindingFromMenu.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 31,
        "menuCode": "crm_switcher:deal",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.unbindingFromMenu.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'landing.site.unbindingFromMenu',
        params: {
          id: 31,
          menuCode: 'crm_switcher:deal',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result)
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
      async function unbindSiteFromMenu() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.site.unbindingFromMenu',
            params: {
              id: 31,
              menuCode: 'crm_switcher:deal',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', unbindSiteFromMenu)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.landing.site.unbinding_from_menu(
            bitrix_id=31,
            menu_code="crm_switcher:deal",
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
                'landing.site.unbindingFromMenu',
                [
                    'id' => 31,
                    'menuCode' => 'crm_switcher:deal',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error unbinding site from menu: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.unbindingFromMenu',
        {
            id: 31,
            menuCode: 'crm_switcher:deal'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.site.unbindingFromMenu',
        [
            'id' => 31,
            'menuCode' => 'crm_switcher:deal',
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "landing.site.unbindingFromMenu", b24.Params{
    	"id":       31,
    	"menuCode": "crm_switcher:deal",
    })
    if err != nil {
    	return fmt.Errorf("landing.site.unbindingFromMenu: %w", err)
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
        "start": 1774959544,
        "finish": 1774959544.732957,
        "duration": 0.7329568862915039,
        "processing": 0,
        "date_start": "2026-03-31T15:19:04+03:00",
        "date_finish": "2026-03-31T15:19:04+03:00",
        "operating_reset_at": 1774960144,
        "operating": 0
    }
}
```

Если привязка не удалена:

```json
{
    "result": false,
    "time": {
        "start": 1774952712,
        "finish": 1774952712.384215,
        "duration": 0.38421511650085449,
        "processing": 0,
        "date_start": "2026-03-31T13:25:12+03:00",
        "date_finish": "2026-03-31T13:25:12+03:00",
        "operating_reset_at": 1774953312,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат отвязки:

- `true` — привязка удалена
- `false` — привязка не удалена

Метод возвращает `false` без ошибки, если:
- сайт с указанным `id` не найден среди Баз знаний или у пользователя нет права на его просмотр
- у пользователя нет права «Размещение в Расширениях» в разделе «База знаний»
- эта База знаний не привязана к меню `menuCode`

Ответ `false` не отличает эти случаи. Текущие привязки можно проверить методом [landing.site.getMenuBindings](./landing-site-get-menu-bindings.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: menuCode"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: menuCode | Вызов метода без `menuCode` ||
|| `400` | `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: id | Вызов метода без `id` ||
|| `400` | `TYPE_ERROR` | Неверный тип одного из аргументов вызова. | В `id` передано нечисловое значение, например `abc` ||
|| `400` | `TYPE_ERROR` | Неверный тип аргумента вызова: id | Параметр `id` передан массивом ||
|| `400` | `TYPE_ERROR` | Неверный тип аргумента вызова: menuCode | Параметр `menuCode` передан массивом ||
|| `400` | `ACCESS_DENIED` | Недостаточно прав. | Метод вызывает пользователь экстранета, или у пользователя нет права «Просмотр» в разделе «Сайты» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-binding-to-menu.md)
- [{#T}](./landing-site-get-menu-bindings.md)
- [{#T}](./landing-site-binding-to-group.md)
- [{#T}](./landing-site-unbinding-from-group.md)
- [{#T}](./index.md)
