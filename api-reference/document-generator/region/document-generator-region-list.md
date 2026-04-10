# Получить список регионов documentgenerator.region.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.region.list` возвращает список предустановленных и пользовательских регионов.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Accept: application/json" \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.region.list
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.region.list
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod('documentgenerator.region.list');
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
      $response = $b24Service->core->call('documentgenerator.region.list');
      $result = $response->getResponseData()->getResult();
      print_r($result);
  } catch (Throwable $e) {
      echo $e->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'documentgenerator.region.list',
      {},
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
  
  $result = CRest::call('documentgenerator.region.list');
  
  print_r($result);
  ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

В ответе могут быть два типа элементов:

- предустановленный регион, у которого обычно есть `code`, `title`, `languageId`
- пользовательский регион, у которого дополнительно могут быть `id`, `formatDate`, `formatDatetime`, `formatName`

```json
{
    "result": {
        "regions": {
            "ru": {
                "code": "ru",
                "title": "Россия",
                "languageId": "ru"
            },
            "by": {
                "code": "by",
                "title": "Беларусь",
                "languageId": "ru"
            },
            "kz": {
                "code": "kz",
                "title": "Казахстан",
                "languageId": "kz"
            },
            "ua": {
                "code": "ua",
                "title": "Украина",
                "languageId": "ua"
            },
            "de": {
                "code": "de",
                "title": "Германия",
                "languageId": "de"
            },
            "uk": {
                "code": "uk",
                "title": "Великобритания",
                "languageId": "en"
            },
            "br": {
                "code": "br",
                "title": "Бразилия",
                "languageId": "br"
            },
            "sp": {
                "code": "sp",
                "title": "Испания",
                "languageId": "la"
            },
            "mx": {
                "code": "mx",
                "title": "Мексика",
                "languageId": "la"
            },
            "pl": {
                "code": "pl",
                "title": "Польша",
                "languageId": "pl"
            },
            "fr": {
                "code": "fr",
                "title": "Франция",
                "languageId": "fr"
            },
            "1": {
                "id": "1",
                "title": "Россия (Пользовательский)",
                "languageId": "ru",
                "formatDate": "DD.MM.YYYY",
                "formatDatetime": "DD.MM.YYYY HH:MI:SS",
                "formatName": "#LAST_NAME# #NAME# #SECOND_NAME#",
                "code": "1"
            }
        }
    },
    "time": {
        "start": 1774431603,
        "finish": 1774431603.769177,
        "duration": 0.7691769599914551,
        "processing": 0,
        "date_start": "2026-03-25T12:40:03+03:00",
        "date_finish": "2026-03-25T12:40:03+03:00",
        "operating_reset_at": 1774432203,
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
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **regions**
[`object`](../../data-types.md) | Список регионов, где ключ объекта это `code` региона [(подробное описание)](#regions) ||
|#

#### Объект regions {#regions}

Объект `regions` может содержать как предустановленные, так и пользовательские регионы.

- Для предустановленного региона обычно доступны поля `code`, `title`, `languageId`
- Для пользовательского региона дополнительно могут возвращаться `id`, `formatDate`, `formatDatetime`, `formatName`

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор пользовательского региона, для предустановленного региона поле может отсутствовать ||
|| **code**
[`string`](../../data-types.md) | Код региона ||
|| **title**
[`string`](../../data-types.md) | Название региона ||
|| **languageId**
[`string`](../../data-types.md) | Идентификатор языка региона ||
|| **formatDate**
[`string`](../../data-types.md) | Формат даты для пользовательского региона ||
|| **formatDatetime**
[`string`](../../data-types.md) | Формат даты и времени для пользовательского региона ||
|| **formatName**
[`string`](../../data-types.md) | Шаблон полного имени для пользовательского региона ||
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

- [{#T}](./document-generator-region-add.md)
- [{#T}](./document-generator-region-update.md)
- [{#T}](./document-generator-region-get.md)
- [{#T}](./document-generator-region-delete.md)
