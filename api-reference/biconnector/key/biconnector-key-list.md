# Получить список ключей доступа biconnector.key.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом управления ключами BI-коннектора, например администратор

Метод `biconnector.key.list` возвращает список ключей доступа BI-коннектора, которые создало приложение.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md). При вызове вебхуком метод возвращает ошибку `insufficient_auth_type`

{% endnote %}

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Поля ключа, которые нужно вернуть. Допустимые значения: `ID`, `ACTIVE`, `DATE_CREATE`, `TIMESTAMP_X`, `CREATED_BY`, `CONNECTION`, `ACCESS_KEY`. Описание полей — в [обзоре методов](./index.md#fields).

Значение ключа `ACCESS_KEY` приходит, только если ключ создал пользователь, от имени которого вызван метод. У остальных ключей поля `ACCESS_KEY` в ответе нет.

Неизвестные поля не учитываются. Если параметр не передан или в нем нет допустимых полей, кроме `ACCESS_KEY`, возвращаются все поля ||
|| **filter**
[`object`](../../data-types.md) | Фильтр в формате `{"поле": "значение"}`. Можно фильтровать по полям `ID`, `ACTIVE`, `DATE_CREATE`, `TIMESTAMP_X`, `CREATED_BY`, `CONNECTION`, `ACCESS_KEY`. Перед названием поля можно указать оператор, например `>=DATE_CREATE` или `!ACTIVE`.

Если в фильтре есть условие по `ACCESS_KEY`, метод ищет только среди ключей, которые создал текущий пользователь.

Условия по другим полям не учитываются ||
|| **order**
[`object`](../../data-types.md) | Сортировка в формате `{"поле": "направление"}`, например `{"ID": "DESC"}`. Направление — `ASC` или `DESC` ||
|| **limit**
[`integer`](../../data-types.md) | Сколько ключей вернуть.

По умолчанию — `50` ||
|| **offset**
[`integer`](../../data-types.md) | Сколько ключей пропустить от начала выборки.

По умолчанию — `0` ||
|#

Метод не возвращает общее количество ключей. Чтобы получить следующую страницу, увеличьте `offset` на `limit`. Если вернулось меньше ключей, чем `limit`, это последняя страница.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{
             "filter": {
                 "ACTIVE": "Y"
             },
             "order": {
                 "ID": "DESC"
             },
             "limit": 5,
             "auth": "**put_access_token_here**"
             }' \
         https://**put_your_bitrix24_address**/rest/biconnector.key.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type BiconnectorKey = {
      ID: string
      ACTIVE: 'Y' | 'N'
      DATE_CREATE: string
      TIMESTAMP_X: string
      CREATED_BY: string
      CONNECTION: string
      // Present only for keys created by the current user
      ACCESS_KEY?: string
    }

    try {
      const response = await $b24.actions.v2.call.make<BiconnectorKey[]>({
        method: 'biconnector.key.list',
        params: {
          filter: {
            ACTIVE: 'Y',
          },
          order: {
            ID: 'DESC',
          },
          limit: 5,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        for (const key of response.getData()!.result) {
          console.info(key.ID, key.ACTIVE, key.ACCESS_KEY ?? 'value is hidden')
        }
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
      async function listKeys() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.key.list',
            params: {
              filter: {
                ACTIVE: 'Y',
              },
              order: {
                ID: 'DESC',
              },
              limit: 5,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          for (const key of response.getData().result) {
            console.info(key.ID, key.ACTIVE, key.ACCESS_KEY ?? 'value is hidden')
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listKeys)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        # В b24pysdk нет готовой обертки для biconnector.key.*, поэтому метод
        # вызывается напрямую через bitrix_token.call_method()
        response = bitrix_token.call_method(
            api_method="biconnector.key.list",
            params={
                "filter": {
                    "ACTIVE": "Y",
                },
                "order": {
                    "ID": "DESC",
                },
                "limit": 5,
            },
        )
        for key in response["result"]:
            print(key["ID"], key["ACTIVE"], key.get("ACCESS_KEY", "value is hidden"))
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
                'biconnector.key.list',
                [
                    'filter' => [
                        'ACTIVE' => 'Y',
                    ],
                    'order' => [
                        'ID' => 'DESC',
                    ],
                    'limit' => 5,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        foreach ($result as $key) {
            echo $key['ID'] . ': ' . ($key['ACCESS_KEY'] ?? 'value is hidden') . PHP_EOL;
        }
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.key.list',
        {
            filter: {
                ACTIVE: 'Y',
            },
            order: {
                ID: 'DESC',
            },
            limit: 5,
        },
        (result) => {
            if (result.error()) {
                console.error(result.error());
                return;
            }

            console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.key.list',
        [
            'filter' => [
                'ACTIVE' => 'Y',
            ],
            'order' => [
                'ID' => 'DESC',
            ],
            'limit' => 5,
        ]
    );

    if (isset($result['error'])) {
        echo 'Error: ' . $result['error'] . ': ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "biconnector.key.list", b24.Params{
    	"filter": b24.Params{
    		"ACTIVE": "Y",
    	},
    	"order": b24.Params{
    		"ID": "DESC",
    	},
    	"limit": 5,
    })
    if err != nil {
    	return fmt.Errorf("biconnector.key.list: %w", err)
    }

    var keys []struct {
    	ID         string `json:"ID"`
    	Active     string `json:"ACTIVE"`
    	DateCreate string `json:"DATE_CREATE"`
    	CreatedBy  string `json:"CREATED_BY"`
    	Connection string `json:"CONNECTION"`
    	AccessKey  string `json:"ACCESS_KEY,omitempty"` // пусто, если ключ создал другой пользователь
    }
    if err := json.Unmarshal(res.Result, &keys); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, k := range keys {
    	fmt.Println(k.ID, k.Active, k.AccessKey)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "15",
            "ACTIVE": "Y",
            "DATE_CREATE": "2026-11-24T16:02:26+03:00",
            "TIMESTAMP_X": "2026-11-24T16:02:39+03:00",
            "CREATED_BY": "1",
            "CONNECTION": "bi",
            "ACCESS_KEY": "a7Kq2Lm9Xc4Rt8Vb1Nz6Hy3Pw5Js0Df"
        }
    ],
    "time": {
        "start": 1795525362,
        "finish": 1795525362.411178,
        "duration": 0.4111781120300293,
        "processing": 0,
        "date_start": "2026-11-24T16:02:42+03:00",
        "date_finish": "2026-11-24T16:02:42+03:00",
        "operating_reset_at": 1795525920,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив ключей с полями из параметра `select`. Описание полей — в [обзоре методов](./index.md#fields). Если ключей нет, приходит пустой массив ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid order \"WRONG\""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Invalid order "#ORDER#" | Направление сортировки в `order` отличается от `ASC` и `DESC` ||
|| `400` | `insufficient_auth_type` | The request requires higher privileges than provided. | Метод вызван вебхуком, а не из приложения ||
|| `400` | `ACCESS_DENIED` | Access denied | У пользователя нет права управления ключами BI-коннектора ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-key-add.md)
- [{#T}](./biconnector-key-update.md)
- [{#T}](./biconnector-key-delete.md)
