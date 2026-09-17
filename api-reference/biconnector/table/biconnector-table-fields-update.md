# Обновить колонки таблицы biconnector.table.fields.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

Метод `biconnector.table.fields.update` обновляет состав колонок существующей таблицы. Схему полей самого объекта «таблица» он не меняет — ее возвращает метод [biconnector.table.fields](./biconnector-table-fields.md).

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md) и изменяет только те таблицы, которые приложение создало само. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор таблицы, можно получить методами [biconnector.table.list](./biconnector-table-list.md) или [biconnector.table.add](./biconnector-table-add.md) ||
|| **add**
[`array`](../../data-types.md) | Массив добавляемых колонок. Каждый элемент — объект с тремя обязательными ключами:

```
{
    "type": "int",
    "name": "NAME",
    "externalCode": "NAME"
}
```

- `type` [`string`](../../data-types.md) — [тип данных](./index.md#fields) колонки
- `name` [`string`](../../data-types.md) — название колонки, заглавные латинские буквы `A-Z`, цифры и знак `_`, не длиннее 32 символов
- `externalCode` [`string`](../../data-types.md) — внешний код колонки

Видимость у добавляемой колонки не задается: новые колонки создаются видимыми ||
|| **update**
[`array`](../../data-types.md) | Массив изменяемых колонок. Каждый элемент — объект с двумя обязательными ключами:

```
{
    "id": 12,
    "visible": false
}
```

- `id` [`integer`](../../data-types.md) — идентификатор колонки, можно получить методом [biconnector.table.get](./biconnector-table-get.md)
- `visible` [`boolean`](../../data-types.md) — видимость колонки

Видимость — единственный признак колонки, который меняет этот блок. Название, тип и внешний код существующей колонки изменить нельзя ||
|| **delete**
[`integer[]`](../../data-types.md) | Массив идентификаторов удаляемых колонок. Идентификаторы можно получить методом [biconnector.table.get](./biconnector-table-get.md) ||
|#

Все три параметра необязательные и обрабатываются в одном вызове в порядке `update`, `add`, `delete`. Непереданный параметр ничего не затирает, а вызов, в котором нет ни одного из трех, вернет `true` и ничего не изменит.

{% note warning "" %}

Идентификаторы в `update`, которых нет у этой таблицы, метод пропускает молча — ошибки не будет. Удаление же идет фильтром только по `id`, без проверки, что колонка принадлежит указанной таблице: перед вызовом сверяйте идентификаторы с ответом [biconnector.table.get](./biconnector-table-get.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "id": 10,
        "add": [
            {
                "type": "int",
                "name": "NAME",
                "externalCode": "NAME"
            },
            {
                "type": "int",
                "name": "ID",
                "externalCode": "ID"
            }
        ],
        "update": [
            {
                "id": 12,
                "visible": false
            },
            {
                "id": 13,
                "visible": true
            }
        ],
        "delete": [
            14,
            15
        ],
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/biconnector.table.fields.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Methods of this section put errors inside result and answer with HTTP 200
    type BiconnectorError = {
      error: {
        error: string
        error_description: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<boolean | BiconnectorError>({
        method: 'biconnector.table.fields.update',
        params: {
          id: 10,
          add: [
            {
              type: 'int',
              name: 'NAME',
              externalCode: 'NAME',
            },
            {
              type: 'int',
              name: 'ID',
              externalCode: 'ID',
            },
          ],
          update: [
            {
              id: 12,
              visible: false,
            },
            {
              id: 13,
              visible: true,
            },
          ],
          delete: [14, 15],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result

        // The SDK sees HTTP 200 as success, so check the error inside result yourself
        if (typeof result === 'object' && result !== null && 'error' in result) {
          console.error(result.error.error, result.error.error_description)
        } else {
          console.info('Table columns updated:', result)
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
      async function updateTableColumns() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.table.fields.update',
            params: {
              id: 10,
              add: [
                {
                  type: 'int',
                  name: 'NAME',
                  externalCode: 'NAME',
                },
                {
                  type: 'int',
                  name: 'ID',
                  externalCode: 'ID',
                },
              ],
              update: [
                {
                  id: 12,
                  visible: false,
                },
                {
                  id: 13,
                  visible: true,
                },
              ],
              delete: [14, 15],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result

          // The SDK sees HTTP 200 as success, so check the error inside result yourself
          if (result && result.error) {
            console.error(result.error.error, result.error.error_description)
            return
          }

          console.info('Table columns updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateTableColumns)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        # В b24pysdk нет готовой обертки для biconnector.table.*, поэтому метод
        # вызывается напрямую через bitrix_token.call_method()
        response = bitrix_token.call_method(
            api_method="biconnector.table.fields.update",
            params={
                "id": 10,
                "add": [
                    {"type": "int", "name": "NAME", "externalCode": "NAME"},
                    {"type": "int", "name": "ID", "externalCode": "ID"},
                ],
                "update": [
                    {"id": 12, "visible": False},
                    {"id": 13, "visible": True},
                ],
                "delete": [14, 15],
            },
        )
        result = response["result"]

        # Методы раздела кладут ошибку внутрь result и отвечают со статусом 200
        if isinstance(result, dict) and "error" in result:
            print(
                "Ошибка BIconnector",
                f"error: {result['error']['error']}",
                f"error_description: {result['error']['error_description']}",
                sep="\n",
            )
        else:
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
                'biconnector.table.fields.update',
                [
                    'id'     => 10,
                    'add'    => [
                        [
                            'type'         => "int",
                            'name'         => "NAME",
                            'externalCode' => "NAME"
                        ],
                        [
                            'type'         => "int",
                            'name'         => "ID",
                            'externalCode' => "ID"
                        ]
                    ],
                    'update' => [
                        [
                            'id'      => 12,
                            'visible' => false
                        ],
                        [
                            'id'      => 13,
                            'visible' => true
                        ]
                    ],
                    'delete' => [14, 15]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            $data = $result->data();

            // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200
            if (isset($data['error'])) {
                echo 'BIconnector error: ' . $data['error']['error'] . ': ' . $data['error']['error_description'];
            } else {
                echo 'Data: ' . print_r($data, true);
            }
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating table columns: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.table.fields.update',
        {
            id: 10,
            add: [
                {
                    type: "int",
                    name: "NAME",
                    externalCode: "NAME"
                },
                {
                    type: "int",
                    name: "ID",
                    externalCode: "ID"
                }
            ],
            update: [
                {
                    "id": 12,
                    "visible": false
                },
                {
                    "id": 13,
                    "visible": true
                }
            ],
            delete: [
                14,
                15
            ]
        },
        (result) => {
            if (result.error()) {
                console.error(result.error());
                return;
            }

            const data = result.data();

            // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200
            if (data && data.error) {
                console.error(data.error.error, data.error.error_description);
                return;
            }

            console.info(data);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.table.fields.update',
        [
            'id' => 10,
            'add' => [
                [
                    'type' => 'int',
                    'name' => 'NAME',
                    'externalCode' => 'NAME'
                ],
                [
                    'type' => 'int',
                    'name' => 'ID',
                    'externalCode' => 'ID'
                ]
            ],
            'update' => [
                [
                    'id' => 12,
                    'visible' => false
                ],
                [
                    'id' => 13,
                    'visible' => true
                ]
            ],
            'delete' => [14, 15]
        ]
    );

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200
    if (isset($result['result']['error'])) {
        echo 'BIconnector error: ' . $result['result']['error']['error']
            . ': ' . $result['result']['error']['error_description'];
    } else {
        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "biconnector.table.fields.update", b24.Params{
    	"id": 10,
    	"add": []b24.Params{
    		{
    			"type":         "int",
    			"name":         "NAME",
    			"externalCode": "NAME",
    		},
    		{
    			"type":         "int",
    			"name":         "ID",
    			"externalCode": "ID",
    		},
    	},
    	"update": []b24.Params{
    		{
    			"id":      12,
    			"visible": false,
    		},
    		{
    			"id":      13,
    			"visible": true,
    		},
    	},
    	"delete": []int{14, 15},
    })
    if err != nil {
    	return fmt.Errorf("biconnector.table.fields.update: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.table.fields.update: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
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
        "start": 1725365418.056843,
        "finish": 1725365419.671506,
        "duration": 1.6146628856658936,
        "processing": 1.3475170135498047,
        "date_start": "2024-09-03T14:10:18+02:00",
        "date_finish": "2024-09-03T14:10:19+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа. При успешном обновлении содержит `true` — нового состава колонок в ответе нет. Чтобы увидеть его, вызовите [biconnector.table.get](./biconnector-table-get.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "result": {
        "error": {
            "error": "VALIDATION_ID_NOT_PROVIDED",
            "error_description": "ID is missing."
        }
    }
}
```

{% note warning "" %}

Метод возвращает ошибку [внутри поля `result`](../index.md#errors) и с HTTP-статусом 200. Проверяйте `result.error`: обертки SDK разбирают только верхний уровень ответа и такую ошибку считают успехом

{% endnote %}

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_DENIED` | Access denied. | Нет одного из двух прав, либо метод вызван вебхуком или вне контекста приложения ||
|| `VALIDATION_ID_NOT_PROVIDED` | ID is missing. | Идентификатор не указан ||
|| `VALIDATION_INVALID_ID_FORMAT` | ID has to be a positive integer. | Неверный формат ID ||
|| `DATASET_NOT_FOUND` | Dataset was not found. | Таблицы нет или она принадлежит другому приложению ||
|| `DATASET_UPDATE_ERROR` | Error updating dataset. | Не удалось синхронизировать изменения с BI-Конструктором. Колонки при этом уже сохранены: синхронизация идет после фиксации изменений, поэтому ошибка приходит по уже примененным правкам и откатывать их метод не будет ||
|| `VALIDATION_DUPLICATE_FIELD_CODE` | Duplicate values found in the "code" parameter: #LIST_CODES# | Обнаружены дубликаты в параметре `externalCode` полей таблицы ||
|| `VALIDATION_DUPLICATE_FIELD_NAME` | Duplicate values found in the "name" parameter: #LIST_NAMES# | Обнаружены дубликаты в параметре `name` полей таблицы ||
|| `VALIDATION_FIELD_NAME_INVALID_FORMAT` | Field "name" has to start with an uppercase Latin character. Possible entry includes uppercase Latin characters (A-Z), numbers (0-9) and underscores. | Неправильный формат названия поля. Название должно начинаться с буквы, можно использовать только заглавные латинские буквы `A-Z`, цифры и знак `_` ||
|| `VALIDATION_FIELD_NAME_TOO_LONG` | Field "name" must not exceed 32 characters. | Название поля не должно превышать 32 символа ||
|| `VALIDATION_FIELD_INVALID_TYPE` | Invalid field type. | Некорректный тип поля ||
|| `VALIDATION_DUPLICATE_EXIST_CODE` | The following "externalCode" values already exist in the current fields: #LIST_CODES# | Поля с таким параметром `externalCode` уже существуют ||
|| `VALIDATION_DUPLICATE_EXIST_NAME` | The following "name" values already exist in the current fields: #LIST_NAMES# | Поля с таким параметром `name` уже существуют ||
|| `VALIDATION_FIELD_ADD_MISSING_REQUIRED_FIELDS` | Field to be added must include the required parameters: "name", "externalCode" and "type". | Поле для добавления должно включать параметры `name`, `externalCode` и `type` ||
|| `VALIDATION_FIELD_UPDATE_MISSING_REQUIRED_FIELDS` | Field to be updated must include the required parameters: "id" and "visible". | Поле для обновления должно включать параметры `id` и `visible` ||
|| `VALIDATION_FIELD_DELETE_INVALID_ID` | ID to be deleted must be a positive integer. | Неверный формат `id` для удаления ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-table-add.md)
- [{#T}](./biconnector-table-update.md)
- [{#T}](./biconnector-table-get.md)
- [{#T}](./biconnector-table-list.md)
- [{#T}](./biconnector-table-delete.md)
- [{#T}](./biconnector-table-fields.md)
