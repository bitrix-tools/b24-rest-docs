# Установить параметры карточки crm.lead.details.configuration.set

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

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

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'crm.lead.details.configuration.set',
          {
              scope: 'P',
              userId: 1,
              extras: {
                  leadCustomerType: 2,
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
                          { name: 'PHONE', optionFlags: 1 },
                      ],
                  },
                  {
                      name: 'additional',
                      title: 'Дополнительно',
                      type: 'section',
                      elements: [
                          { name: 'ASSIGNED_BY_ID' },
                          { name: 'COMMENTS' },
                      ],
                  },
              ],
          }
      );

      const result = response.getData().result;
      console.info(result);
  }
  catch (error)
  {
      console.error(error);
  }
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





