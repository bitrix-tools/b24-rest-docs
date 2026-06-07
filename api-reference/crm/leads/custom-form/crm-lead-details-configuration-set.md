# Установить параметры карточки crm.lead.details.configuration.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
>  - любой пользователь может установить свои настройки,
>  - пользователь с правом «Разрешить изменять настройки» в CRM может установить чужие и общие настройки

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.details.configuration.set](../../universal/item-details-configuration/crm-item-details-configuration-set.md).

{% endnote %}

Метод `crm.lead.details.configuration.set` устанавливает настройки карточки лидов.

{% note warning %}

Настройки карточки повторных лидов могут отличаться от настроек карточки простых лидов. Для переключения между настройками карточек лидов применяйте параметр `leadCustomerType`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **data***
[`section[]`](#section) | Список разделов карточки. Каждый раздел содержит набор полей, которые будут выведены в карточке лида ||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя, для которого нужно сохранить личную конфигурацию.

Если параметр не передан, будет использован `userId` пользователя, который вызывает метод.

Нужен только при установке личных настроек ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек. Возможные значения:
- `'P'` - личные настройки
- `'C'` - общие настройки

По умолчанию используется значение `'P'` ||
|| **extras**
[`object`](../../../data-types.md) | Дополнительные параметры для выбора типа лида. Структура описана [ниже](#extras) ||
|#

### Параметр section {#section}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Уникальное имя раздела ||
|| **title***
[`string`](../../../data-types.md) | Заголовок раздела ||
|| **type***
[`string`](../../../data-types.md) | Тип раздела. Поддерживается только значение `'section'` ||
|| **elements**
[`section_element[]`](#section_element) | Список полей, которые отображаются в разделе ||
|#

### Параметр section_element {#section_element}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Идентификатор поля лида. Список доступных полей можно получить методом [crm.lead.fields](../crm-lead-fields.md) ||
|| **optionFlags**
[`integer`](../../../data-types.md) | Нужно ли показывать поле всегда:
- `1` - да
- `0` - нет

По умолчанию используется значение `0` ||
|| **options**
[`object`](../../../data-types.md) | Дополнительные опции поля. Набор опций зависит от типа поля ||
|#

### Параметр extras {#extras}

#|
|| **Название**
`тип` | **Описание** ||
|| **leadCustomerType**
[`integer`](../../../data-types.md) | Тип лида. Возможные значения:
- `1` - простой лид
- `2` - повторный лид ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"scope":"P","userId":1,"extras":{"leadCustomerType":2},"data":[{"name":"main","title":"О лиде","type":"section","elements":[{"name":"TITLE"},{"name":"STATUS_ID"},{"name":"SOURCE_ID"},{"name":"NAME"},{"name":"PHONE","optionFlags":1}]},{"name":"additional","title":"Дополнительно","type":"section","elements":[{"name":"ASSIGNED_BY_ID"},{"name":"COMMENTS"}]}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.details.configuration.set
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"scope":"P","userId":1,"extras":{"leadCustomerType":2},"data":[{"name":"main","title":"О лиде","type":"section","elements":[{"name":"TITLE"},{"name":"STATUS_ID"},{"name":"SOURCE_ID"},{"name":"NAME"},{"name":"PHONE","optionFlags":1}]},{"name":"additional","title":"Дополнительно","type":"section","elements":[{"name":"ASSIGNED_BY_ID"},{"name":"COMMENTS"}]}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.details.configuration.set
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
      method: 'crm.lead.details.configuration.set',
      params: {
        scope: 'P',
        userId: 1,
        extras: {
          leadCustomerType: 2,
        },
        data: [
          {
            name: 'main',
            title: 'About lead',
            type: 'section',
            elements: [
              { name: 'TITLE' },
              { name: 'STATUS_ID' },
              { name: 'SOURCE_ID' },
              { name: 'NAME' },
              { name: 'PHONE', optionFlags: 1 },
            ],
          },
          {
            name: 'additional',
            title: 'Additional',
            type: 'section',
            elements: [
              { name: 'ASSIGNED_BY_ID' },
              { name: 'COMMENTS' },
            ],
          },
        ],
      },
      requestId: Text.getUuidRfc4122()
    })

    // The payload is available only on a successful response
    if (!response.isSuccess) {
      console.error(response.getErrorMessages().join('; '))
    } else {
      const result = response.getData()!.result
      console.info('Configuration saved:', result)
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
    async function setLeadCardConfiguration() {
      try {
        // Initialize the SDK inside a Bitrix24 frame
        const $b24 = await B24Js.initializeB24Frame()

        const response = await $b24.actions.v2.call.make({
          method: 'crm.lead.details.configuration.set',
          params: {
            scope: 'P',
            userId: 1,
            extras: {
              leadCustomerType: 2,
            },
            data: [
              {
                name: 'main',
                title: 'About lead',
                type: 'section',
                elements: [
                  { name: 'TITLE' },
                  { name: 'STATUS_ID' },
                  { name: 'SOURCE_ID' },
                  { name: 'NAME' },
                  { name: 'PHONE', optionFlags: 1 },
                ],
              },
              {
                name: 'additional',
                title: 'Additional',
                type: 'section',
                elements: [
                  { name: 'ASSIGNED_BY_ID' },
                  { name: 'COMMENTS' },
                ],
              },
            ],
          },
          requestId: B24Js.Text.getUuidRfc4122()
        })

        // The payload is available only on a successful response
        if (!response.isSuccess) {
          console.error(response.getErrorMessages().join('; '))
          return
        }

        const result = response.getData().result
        console.info('Configuration saved:', result)
      } catch (error) {
        // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
        console.error(error)
      }
    }

    document.addEventListener('DOMContentLoaded', setLeadCardConfiguration)
  </script>
  ```

- PHP

  ```php
  try {
      $response = $b24Service
          ->core
          ->call(
              'crm.lead.details.configuration.set',
              [
                  'scope' => 'P',
                  'userId' => 1,
                  'extras' => [
                      'leadCustomerType' => 2,
                  ],
                  'data' => [
                      [
                          'name' => 'main',
                          'title' => 'О лиде',
                          'type' => 'section',
                          'elements' => [
                              ['name' => 'TITLE'],
                              ['name' => 'STATUS_ID'],
                              ['name' => 'SOURCE_ID'],
                              ['name' => 'NAME'],
                              ['name' => 'PHONE', 'optionFlags' => 1],
                          ],
                      ],
                      [
                          'name' => 'additional',
                          'title' => 'Дополнительно',
                          'type' => 'section',
                          'elements' => [
                              ['name' => 'ASSIGNED_BY_ID'],
                              ['name' => 'COMMENTS'],
                          ],
                      ],
                  ],
              ]
          );

      $result = $response
          ->getResponseData()
          ->getResult();

      echo 'Result: ' . print_r($result, true);
  } catch (Throwable $e) {
      error_log($e->getMessage());
      echo 'Error: ' . $e->getMessage();
  }
  ```

- BX24.js

  ```javascript
  BX24.callMethod(
      'crm.lead.details.configuration.set',
      {
          scope: 'P',
          userId: 1,
          extras: {
              leadCustomerType: 2
          },
          data: [
              {
                  name: 'main',
                  title: 'О лиде',
                  type: 'section',
                  elements: [
                      { name: 'TITLE' },
                      { name: 'STATUS_ID' },
                      { name: 'SOURCE_ID' },
                      { name: 'NAME' },
                      { name: 'PHONE', optionFlags: 1 }
                  ]
              },
              {
                  name: 'additional',
                  title: 'Дополнительно',
                  type: 'section',
                  elements: [
                      { name: 'ASSIGNED_BY_ID' },
                      { name: 'COMMENTS' }
                  ]
              }
          ]
      },
      function(result)
      {
          if (result.error())
          {
              console.error(result.error());
          }
          else
          {
              console.log(result.data());
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'crm.lead.details.configuration.set',
      [
          'scope' => 'P',
          'userId' => 1,
          'extras' => [
              'leadCustomerType' => 2,
          ],
          'data' => [
              [
                  'name' => 'main',
                  'title' => 'О лиде',
                  'type' => 'section',
                  'elements' => [
                      ['name' => 'TITLE'],
                      ['name' => 'STATUS_ID'],
                      ['name' => 'SOURCE_ID'],
                      ['name' => 'NAME'],
                      ['name' => 'PHONE', 'optionFlags' => 1],
                  ],
              ],
              [
                  'name' => 'additional',
                  'title' => 'Дополнительно',
                  'type' => 'section',
                  'elements' => [
                      ['name' => 'ASSIGNED_BY_ID'],
                      ['name' => 'COMMENTS'],
                  ],
              ],
          ],
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
        bitrix_response = client.crm.lead.details.configuration.set(
            scope="P",
            user_id=1,
            extras={"leadCustomerType": 2},
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
    "result": true,
    "time": {
        "start": 1720728468.828951,
        "finish": 1720728469.214046,
        "duration": 0.38509488105773926,
        "processing": 0.018099069595336914,
        "date_start": "2024-07-11T22:54:28+02:00",
        "date_finish": "2024-07-11T22:54:29+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Возвращает `true`, если настройки успешно сохранены ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Element at index 0 in section at index 1 does not have name."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | Access denied | Недостаточно прав ||
|| `-` | Parameter 'data' must be array | В `data` передан не массив ||
|| `-` | The data must be indexed array | В `data` передан не индексированный массив ||
|| `-` | There are no data to write | В `data` передан пустой массив ||
|| `-` | Section at index `i` have type `data[i].type`. The expected type is 'section' | В `data[i].type` передано значение отличное от `'section'` ||
|| `-` | Section at index `i` does not have name | В `data[i].name` передано пустое значение ||
|| `-` | Section at index `i` does not have title | В `data[i].title` передано пустое значение ||
|| `-` | Element at index `j` in section at index `i` does not have name | В `data[i].elements[j].name` передано пустое значение ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-lead-details-configuration-get.md)
- [{#T}](./crm-lead-details-configuration-reset.md)
- [{#T}](./crm-lead-details-configuration-force-common-scope-for-all.md)





