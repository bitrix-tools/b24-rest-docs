# Изменить цифровое рабочее место crm.automatedsolution.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- здесь есть ссылка на файл data-types, надо проверить что там описан тип crm_dynamic_type (из смарт-процессов)

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу crm

Метод обновляет существующие настройки цифрового рабочего места с идентификатором `id`. Если какое-то из полей не было передано, его значение останется прежним.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор цифрового рабочего места. Может быть получен из ответа метода [crm.automatedsolution.add](./crm-automated-solution-add.md) (result.automatedSolution.id), который был вызван при добавлении цифрового рабочего места, или [crm.automatedsolution.list](./crm-automated-solution-list.md). Так же можно воспользоваться разделом «Цифровые рабочие места» на портале Битрикс24 — колонка `ID` в списке цифровых рабочих мест ||
|| **fields***
[`object`](../data-types.md) | Значения полей (подробное описание приведено ниже) для создания цифрового рабочего места в виде структуры:

```js
"fields": {
    "title": "значение",
    "typeIds": []
}
```
||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название цифрового рабочего места.

Будьте внимательны с изменением поля `title`. Так как ссылка на цифровое рабочее место строится на основании названия, при его изменении изменится и ссылка на цифровое рабочее место ||
|| **typeIds**
[`crm_dynamic_type.id[]`](../data-types.md) | Массив идентификаторов смарт-процессов, которые нужно привязать к этому рабочему месту.

Чтобы изменить список привязанных смарт-процессов, нужно передать поле `typeIds` с желаемым набором смарт-процессов.

{% note warning %}

Настройки переписываются полностью. При изменении списка привязанных смарт-процессов, надо передавать набор `typeIds` целиком, либо опустить ключ `typeIds` вообще 

{% endnote %}

 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

1. Изменить название цифрового рабочего места

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"title":"HR & Customer Success"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"title":"HR & Customer Success"},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.update
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type AutomatedSolutionUpdateResult = {
          automatedSolution: {
            id: number
            title: string
            typeIds: number[]
          }
        }

        try {
          const response = await $b24.actions.v2.call.make<AutomatedSolutionUpdateResult>({
            method: 'crm.automatedsolution.update',
            params: {
              id: 238,
              fields: {
                title: 'HR & Customer Success',
              },
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info(result.automatedSolution.id, result.automatedSolution.title, result.automatedSolution.typeIds)
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
          async function updateAutomatedSolution() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.automatedsolution.update',
                params: {
                  id: 238,
                  fields: {
                    title: 'HR & Customer Success',
                  },
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const result = response.getData().result
              console.info(result.automatedSolution.id, result.automatedSolution.title, result.automatedSolution.typeIds)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', updateAutomatedSolution)
        </script>
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.automatedsolution.update',
            [
                'id' => 238,
                'fields' =>
                [
                    'title' => 'HR & Customer Success'
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
            bitrix_response = client.crm.automatedsolution.update(
                bitrix_id=238,
                fields={
                    "title": "HR and Customer Success",
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
    {% endlist %}

2. Изменить список привязанных смарт-процессов

    Допустим к цифровому рабочему месту с `id` = `267` были привязаны два смарт-процесса — один с `id` = `14`, а другой — с `id` = `158`. Если мы хотим, чтобы в цифровом рабочем месте остался только один смарт-процесс, то передаем поле `typeIds`, содержащее только нужные смарт-процессы:

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"typeIds":[14]}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"typeIds":[14]},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.update
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type AutomatedSolutionUpdateResult = {
          automatedSolution: {
            id: number
            title: string
            typeIds: number[]
          }
        }

        try {
          const response = await $b24.actions.v2.call.make<AutomatedSolutionUpdateResult>({
            method: 'crm.automatedsolution.update',
            params: {
              id: 238,
              fields: {
                typeIds: [14],
              },
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info(result.automatedSolution.id, result.automatedSolution.title, result.automatedSolution.typeIds)
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
          async function updateAutomatedSolution() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.automatedsolution.update',
                params: {
                  id: 238,
                  fields: {
                    typeIds: [14],
                  },
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const result = response.getData().result
              console.info(result.automatedSolution.id, result.automatedSolution.title, result.automatedSolution.typeIds)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', updateAutomatedSolution)
        </script>
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.automatedsolution.update',
            [
                'id' => 238,
                'fields' =>
                [
                    'typeIds' => [14]
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
            bitrix_response = client.crm.automatedsolution.update(
                bitrix_id=238,
                fields={
                    "typeIds": [14],
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
    {% endlist %}

3. Отвязать все смарт-процессы

    Чтобы отвязать все смарт-процессы от цифрового рабочего места, нужно передать пустой массив в качестве `typeIds`.

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"typeIds":[]}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"typeIds":[]},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.update
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type AutomatedSolutionUpdateResult = {
          automatedSolution: {
            id: number
            title: string
            typeIds: number[]
          }
        }

        try {
          const response = await $b24.actions.v2.call.make<AutomatedSolutionUpdateResult>({
            method: 'crm.automatedsolution.update',
            params: {
              id: 238,
              fields: {
                typeIds: [],
              },
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info(result.automatedSolution.id, result.automatedSolution.title, result.automatedSolution.typeIds)
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
          async function updateAutomatedSolution() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.automatedsolution.update',
                params: {
                  id: 238,
                  fields: {
                    typeIds: [],
                  },
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const result = response.getData().result
              console.info(result.automatedSolution.id, result.automatedSolution.title, result.automatedSolution.typeIds)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', updateAutomatedSolution)
        </script>
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.automatedsolution.update',
            [
                'id' => 238,
                'fields' =>
                [
                    'typeIds' => []
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
            bitrix_response = client.crm.automatedsolution.update(
                bitrix_id=238,
                fields={
                    "typeIds": [],
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
    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "automatedSolution": {
            "id": 1,
            "title": "HR",
            "typeIds": [
                1,
                2,
                3
            ]
        }
    },
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
|| **automatedSolution**
[`object`](../../data-types.md) | Объект с информацией об обновленном цифровом рабочем месте ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"BX_EMPTY_REQUIRED",
    "error_description":"Не заполнено обязательное поле"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-automated-solution-add.md)
- [{#T}](./crm-automated-solution-get.md)
- [{#T}](./crm-automated-solution-list.md)
- [{#T}](./crm-automated-solution-delete.md)
- [{#T}](./crm-automated-solution-fields.md)
