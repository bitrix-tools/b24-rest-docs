# Получить список нумераторов documentgenerator.numerator.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.numerator.list` возвращает список нумераторов для генератора документов. Возвращает все нумераторы, доступные в текущем Битрикс24, в том числе [CRM нумераторы](../../crm/document-generator/numerator/index.md).

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 элементов.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов, необходимо передавать `100` и так далее.

Формула расчета значения `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.numerator.list
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.numerator.list
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.numerator.list',
          {
              start: 0
          }
      );

      const result = response.getData().result;
      console.log(result);
  }
  catch (error)
  {
      console.error(error);
  }
  ```

- PHP

  ```php
  try {
      $response = $b24Service->core->call(
          'documentgenerator.numerator.list',
          [
              'start' => 0,
          ]
      );

      $result = $response->getResponseData()->getResult();
      print_r($result);
  } catch (Throwable $e) {
      echo $e->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'documentgenerator.numerator.list',
      {
          start: 0
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
      'documentgenerator.numerator.list',
      [
          'start' => 0,
      ]
  );

  print_r($result);
  ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "numerators": [
            ..., // описание других нумераторов, в том числе CRM
            {
                "id": "53",
                "name": "Общий номер",
                "template": "{NUMBER}",
                "settings": {
                    "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                        "start": 1,
                        "step": 1,
                        "length": 0,
                        "padString": "0",
                        "periodicBy": null,
                        "timezone": null,
                        "isDirectNumeration": false
                    }
                }
            },
            {
                "id": "55",
                "name": "REST Invoice Numerator Updated",
                "template": "INV-UPD-{NUMBER}",
                "settings": {
                    "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                        "start": 2000,
                        "step": 10,
                        "length": 8,
                        "padString": "0",
                        "periodicBy": "year",
                        "timezone": "Europe/Moscow",
                        "isDirectNumeration": false
                    }
                }
            }
        ]
    },
    "total": 20,
    "time": {
        "start": 1774363478,
        "finish": 1774363478.809978,
        "duration": 0.8099780082702637,
        "processing": 0,
        "date_start": "2026-03-24T17:44:38+03:00",
        "date_finish": "2026-03-24T17:44:38+03:00",
        "operating_reset_at": 1774364078,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **total**
[`integer`](../../data-types.md) | Количество нумераторов в текущей выборке ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **numerators**
[`array`](../../data-types.md) | Список нумераторов [(подробное описание)](#numerators) ||
|#

#### Элемент массива numerators {#numerators}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **name**
[`string`](../../data-types.md) | Название нумератора ||
|| **template**
[`string`](../../data-types.md) | Шаблон номера ||
|| **code**
[`string`](../../data-types.md) | Символьный код нумератора. Может быть `null` ||
|| **settings**
[`object`](../../data-types.md) | Настройки генераторов нумератора [(подробное описание)](#numerators-settings) ||
|#

#### Объект settings {#numerators-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **Bitrix_Main_Numerator_Generator_SequentNumberGenerator**
[`object`](../../data-types.md) | Настройки последовательной нумерации [(подробное описание)](#numerators-settings-sequent) ||
|#

#### Объект Bitrix_Main_Numerator_Generator_SequentNumberGenerator {#numerators-settings-sequent}

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../data-types.md) | Начальное значение счетчика ||
|| **step**
[`integer`](../../data-types.md) | Шаг увеличения счетчика ||
|| **length**
[`integer`](../../data-types.md) | Минимальная длина номера ||
|| **padString**
[`string`](../../data-types.md) | Символ добивки слева при `length > 0` ||
|| **periodicBy**
[`string`](../../data-types.md) | Период сброса счетчика. Может быть `null` ||
|| **timezone**
[`string`](../../data-types.md) | Идентификатор часового пояса для периодического сброса. Может быть `null` ||
|| **isDirectNumeration**
[`boolean`](../../data-types.md) | Признак прямой нумерации ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "You do not have permissions to modify templates"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав на изменение шаблонов генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-numerator-add.md)
- [{#T}](./document-generator-numerator-update.md)
- [{#T}](./document-generator-numerator-get.md)
- [{#T}](./document-generator-numerator-delete.md)
