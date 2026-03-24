# Получить список полей шаблона documentgenerator.template.getfields

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.template.getfields` возвращает карточку полей шаблона.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор шаблона.

Получить идентификатор шаблона можно после [создания шаблона](./document-generator-template-add.md) или методом [получения списка шаблонов](./document-generator-template-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":57}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.template.getfields
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":57,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.template.getfields
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.template.getfields',
          {
              id: 57
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
          'documentgenerator.template.getfields',
          [
              'id' => 57,
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
      'documentgenerator.template.getfields',
      {
          id: 57
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
      'documentgenerator.template.getfields',
      [
          'id' => 57,
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
        "templateFields": {
            "DocumentNumber": {
                "title": "Номер",
                "value": "9",
                "required": "Y",
                "group": [
                    "Документ"
                ],
                "chain": "this.DOCUMENT.DOCUMENT_NUMBER",
                "default": "9"
            },
            "CurrentDate": {
                "value": "",
                "default": ""
            },
            "ClientName": {
                "value": "",
                "default": ""
            },
            "ClientPhone": {
                "value": "",
                "default": ""
            },
            "Total": {
                "value": "",
                "default": ""
            },
            "Comment": {
                "value": "",
                "default": ""
            },
            "UserName": {
                "value": "",
                "default": ""
            },
            "DocumentTitle": {
                "title": "Название документа",
                "value": "SUPPLY_CONTRACT_NEW Template 1773843147554 9",
                "group": [
                    "Документ"
                ],
                "chain": [
                    {},
                    "getTitle"
                ],
                "required": "Y",
                "default": "SUPPLY_CONTRACT_NEW Template 1773843147554 9"
            }
        }
    },
    "time": {
        "start": 1774332782,
        "finish": 1774332783.055467,
        "duration": 1.055466890335083,
        "processing": 1,
        "date_start": "2026-03-24T09:13:02+03:00",
        "date_finish": "2026-03-24T09:13:03+03:00",
        "operating_reset_at": 1774333382,
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
|| **templateFields**
[`object`](../../data-types.md) | Объект полей шаблона. Ключ — поле шаблона, значение — описание поля [(подробное описание)](#templatefield).

Набор полей в описании зависит от типа поля ||
|#

#### Объект templateField {#templatefield}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название поля, может отсутствовать ||
|| **value**
[`any`](../../data-types.md) | Текущее значение поля ||
|| **default**
[`any`](../../data-types.md) | Значение поля по умолчанию ||
|| **required**
[`char`](../../data-types.md) | Признак обязательности.
-  `Y` — обязательное
-  `N` — необязательное ||
|| **type**
[`string`](../../data-types.md) | Тип поля, например `IMAGE` ||
|| **group**
[`array`](../../data-types.md) | Группы, к которым относится поле ||
|| **chain**
[`string`](../../data-types.md) \| [`array`](../../data-types.md) | Путь поля в провайдере данных ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Cannot get fields from deleted template"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Bitrix\DocumentGenerator\Template constructor must be is public | Не передан обязательный параметр `id` ||
|| `400` | `0` | Шаблон не найден | Шаблон с указанным `id` не найден ||
|| `400` | `0` | Cannot get fields from deleted template | Нельзя получить поля удаленного шаблона ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав для работы с шаблонами ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-template-add.md)
- [{#T}](./document-generator-template-update.md)
- [{#T}](./document-generator-template-get.md)
- [{#T}](./document-generator-template-list.md)
- [{#T}](./document-generator-template-delete.md)
