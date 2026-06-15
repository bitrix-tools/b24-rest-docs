# Получить список цифровых рабочих мест crm.automatedsolution.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Метод вернет массив настроек цифровых рабочих мест. Каждый элемент массива — это структура, аналогичная ответу на запрос [crm.automatedsolution.get](./crm-automated-solution-get.md).

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`](../../data-types.md) | Список для сортировки в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где ключ — поле, а значение — `ASC` или `DESC`. Доступные для сортировки поля:
- `id`
- `title` 
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных цифровых рабочих мест в формате `{"field_1": "value_1", ... "field_N": "value_N"}`. Доступные для фильтрации поля:
- `id`
- `title`
 
Фильтр может иметь неограниченную вложенность и количество условий. По умолчанию все условия соединяются друг с другом как `AND` (логическое И). Если нужно использовать `OR` (Логическое ИЛИ), то можно передать специальный ключ `logic` со значением `OR`.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищем значения, начинающиеся с «мол»
    - `"%мол"` — ищем значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции

- `%=` — LIKE (см. описание выше)

- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.

- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищем значения, не начинающиеся с «мол»
    - `"%мол"` — ищем значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции

- `!%=` — NOT LIKE (см. описание выше)

- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` - не равно
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.
 
Размер страницы результатов всегда статичный: 50 записей.
 
Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.
 
Формула расчета значения параметра `start`:
 
`start = (N-1) * 50`, где `N` — номер нужной страницы
 ||
|#

## Примеры кода

1. Получить все цифровые рабочие места, отсортированные по убыванию `id`

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"id":"DESC"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"id":"DESC"},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.list
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        type AutomatedSolutionItem = {
          id: number
          title: string
          typeIds: number[]
        }

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type AutomatedSolutionListResult = {
          automatedSolutions: AutomatedSolutionItem[]
        }

        // crm.automatedsolution.list returns a single page (max 50 records). For the whole result set
        // use a list helper: $b24.actions.v2.callList.make() returns every record as one
        // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
        // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
        // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
        try {
          const response = await $b24.actions.v2.call.make<AutomatedSolutionListResult>({
            method: 'crm.automatedsolution.list',
            params: {
              order: { id: 'DESC' },
              start: 0,
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info(result.automatedSolutions.length, result.automatedSolutions)
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
          async function listAutomatedSolutions() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              // crm.automatedsolution.list returns a single page (max 50 records). For the whole result set
              // use a list helper: $b24.actions.v2.callList.make() returns every record as one
              // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
              // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
              // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
              const response = await $b24.actions.v2.call.make({
                method: 'crm.automatedsolution.list',
                params: {
                  order: { id: 'DESC' },
                  start: 0,
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const result = response.getData().result
              console.info(result.automatedSolutions.length, result.automatedSolutions)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', listAutomatedSolutions)
        </script>
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.automatedsolution.list',
            [
                'order' => [
                    'id' => 'DESC'
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - Python

        Пример

        ```python
        from b24pysdk.client import BaseClient
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        client: BaseClient

        try:
            bitrix_response = client.crm.automatedsolution.list(
                order={"id": "DESC"},
                start=0,
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

        Пример `as_list`

        ```python
        from b24pysdk.client import BaseClient
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        client: BaseClient

        try:
            bitrix_response = client.crm.automatedsolution.list(
                order={"id": "ASC"},
            ).as_list().response
            result = bitrix_response.result
            for item in result:
                print(item)
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

        Пример `as_list_fast`

        ```python
        from b24pysdk.client import BaseClient
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        client: BaseClient

        try:
            bitrix_response = client.crm.automatedsolution.list(
                order={"id": "DESC"},
            ).as_list_fast(descending=True).response
            result = bitrix_response.result
            for item in result:
                print(item)
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
    {% endlist %}

2. Получить все цифровые рабочие места, название которых начинается с «HR»

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"filter":{"%=title":"HR%"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"filter":{"%=title":"HR%"},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.list
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        type AutomatedSolutionItem = {
          id: number
          title: string
          typeIds: number[]
        }

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type AutomatedSolutionListResult = {
          automatedSolutions: AutomatedSolutionItem[]
        }

        // crm.automatedsolution.list returns a single page (max 50 records). For the whole result set
        // use a list helper: $b24.actions.v2.callList.make() returns every record as one
        // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
        // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
        // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
        try {
          const response = await $b24.actions.v2.call.make<AutomatedSolutionListResult>({
            method: 'crm.automatedsolution.list',
            params: {
              filter: { '%=title': 'HR%' },
              start: 0,
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info(result.automatedSolutions.length, result.automatedSolutions)
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
          async function listAutomatedSolutionsByTitle() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              // crm.automatedsolution.list returns a single page (max 50 records). For the whole result set
              // use a list helper: $b24.actions.v2.callList.make() returns every record as one
              // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
              // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
              // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
              const response = await $b24.actions.v2.call.make({
                method: 'crm.automatedsolution.list',
                params: {
                  filter: { '%=title': 'HR%' },
                  start: 0,
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const result = response.getData().result
              console.info(result.automatedSolutions.length, result.automatedSolutions)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', listAutomatedSolutionsByTitle)
        </script>
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.automatedsolution.list',
            [
                'filter' => [
                    '%=title' => 'HR%'
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - Python

        Пример

        ```python
        from b24pysdk.client import BaseClient
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        client: BaseClient

        try:
            bitrix_response = client.crm.automatedsolution.list(
                filter={"%=title": "HR%"},
                order={"title": "ASC"},
                start=0,
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
    {% endlist %}

3. Получить все цифровые места, у которых название начинается с «HR» или «Customer» и `id` больше `100` с сортировкой по названию

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"title":"ASC"},"filter":{">id":100,"0":{"logic":"OR","0":{"%=title":"HR%"},"1":{"%=title":"Customer%"}}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"title":"ASC"},"filter":{">id":100,"0":{"logic":"OR","0":{"%=title":"HR%"},"1":{"%=title":"Customer%"}}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.list
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        type AutomatedSolutionItem = {
          id: number
          title: string
          typeIds: number[]
        }

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type AutomatedSolutionListResult = {
          automatedSolutions: AutomatedSolutionItem[]
        }

        // crm.automatedsolution.list returns a single page (max 50 records). For the whole result set
        // use a list helper: $b24.actions.v2.callList.make() returns every record as one
        // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
        // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
        // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
        try {
          const response = await $b24.actions.v2.call.make<AutomatedSolutionListResult>({
            method: 'crm.automatedsolution.list',
            params: {
              order: { title: 'ASC' },
              filter: {
                '>id': 100,
                '0': {
                  logic: 'OR',
                  '0': { '%=title': 'HR%' },
                  '1': { '%=title': 'Customer%' },
                },
              },
              start: 0,
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info(result.automatedSolutions.length, result.automatedSolutions)
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
          async function listFilteredAutomatedSolutions() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              // crm.automatedsolution.list returns a single page (max 50 records). For the whole result set
              // use a list helper: $b24.actions.v2.callList.make() returns every record as one
              // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
              // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
              // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
              const response = await $b24.actions.v2.call.make({
                method: 'crm.automatedsolution.list',
                params: {
                  order: { title: 'ASC' },
                  filter: {
                    '>id': 100,
                    '0': {
                      logic: 'OR',
                      '0': { '%=title': 'HR%' },
                      '1': { '%=title': 'Customer%' },
                    },
                  },
                  start: 0,
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const result = response.getData().result
              console.info(result.automatedSolutions.length, result.automatedSolutions)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', listFilteredAutomatedSolutions)
        </script>
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.automatedsolution.list',
            [
                'order' => [
                    'title' => 'ASC'
                ],
                'filter' => [
                    '>id' => 100,
                    '0' => [
                        'logic' => 'OR',
                        '0' => [
                            '%=title' => 'HR%'
                        ],
                        '1' => [
                            '%=title' => 'Customer%'
                        ]
                    ]
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - Python

        Пример

        ```python
        from b24pysdk.client import BaseClient
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        client: BaseClient

        try:
            bitrix_response = client.crm.automatedsolution.list(
                order={"title": "ASC"},
                filter={
                    ">id": 100,
                    "0": {
                        "logic": "OR",
                        "0": {"%=title": "HR%"},
                        "1": {"%=title": "Customer%"},
                    },
                },
                start=0,
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
    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
	"result": {
		"automatedSolutions": [
			{
				"id": 238,
				"title": "HR",
				"typeIds": [
					129
				]
			},
			{
				"id": 240,
				"title": "Customer Success",
				"typeIds": []
			},
			{
				"id": 267,
				"title": "R&D",
				"typeIds": [
					14,
					158
				]
			}
		]
	},
	"total": 3,
	"time": {
		"start": 1715849396.642359,
		"finish": 1715849396.954623,
		"duration": 0.31226396560668945,
		"processing": 0.0068209171295166016,
		"date_start": "2024-05-16T11:49:56+03:00",
		"date_finish": "2024-05-16T11:49:56+03:00",
		"operating_reset_at": 1715849996,
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
|| **automatedSolutions**
[`object`](../../data-types.md) | Массив объектов с информацией о выбранных оплатах ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ACCESS_DENIED",
    "error_description":"Недостаточно прав"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `INVALID_ARG_VALUE` | Неверное значение входных аргументов. Подробности можно узнать в тексте ошибки ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-automated-solution-add.md)
- [{#T}](./crm-automated-solution-update.md)
- [{#T}](./crm-automated-solution-get.md)
- [{#T}](./crm-automated-solution-delete.md)
- [{#T}](./crm-automated-solution-fields.md)