# Изменить регион documentgenerator.region.update

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.region.update` обновляет пользовательский регион по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор пользовательского региона.

Получить идентификатор можно после [создания региона](./document-generator-region-add.md) или методом [получения списка регионов](./document-generator-region-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Параметры для обновления [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Новое название региона ||
|| **languageId**
[`string`](../../data-types.md) | Идентификатор языка региона, например `ru` ||
|| **formatDate**
[`string`](../../data-types.md) | Формат даты ||
|| **formatDatetime**
[`string`](../../data-types.md) | Формат даты и времени ||
|| **formatName**
[`string`](../../data-types.md) | Шаблон полного имени, например `#LAST_NAME# #NAME# #SECOND_NAME#`.

Список возможных модификаторов:

- `#TITLE#` — обращение
- `#NAME#` — имя
- `#LAST_NAME#` — фамилия
- `#SECOND_NAME#` — отчество
- `#NAME_SHORT#` — первая буква имени с точкой
- `#LAST_NAME_SHORT#` — первая буква фамилии с точкой
- `#SECOND_NAME_SHORT#` — первая буква отчества с точкой

{% note tip "Пользовательская документация" %}

- [Что такое модификаторы в шаблонах документов](https://helpdesk.bitrix24.ru/open/18175702/)

{% endnote %}

||
|| **phrases**
[`object`](../../data-types.md) | Набор фраз региона в формате `код: текст`.

Ключи объекта строковые и задаются произвольно в зависимости от шаблона. Значения ключей тоже строковые.

Чтобы понять, какие поля используются в шаблоне документа, получите их список методом [documentgenerator.template.getfields](../templates/document-generator-template-get-fields.md). По этим полям удобно определить, для каких значений шаблона нужны свои языковые фразы.

Примеры:

- `TAX_INCLUDED`: `Налог включен в цену`
- `TAX_NOT_INCLUDED`: `НДС не включен в цену`
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "id": 1,
      "fields": {
        "title": "Россия (Пользовательский)",
        "formatDate": "YYYY-MM-DD",
        "phrases": {
          "TAX_INCLUDED": "Налог включен в цену"
        }
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.region.update
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "id": 1,
      "fields": {
        "title": "Россия (Пользовательский)",
        "formatDate": "YYYY-MM-DD",
        "phrases": {
          "TAX_INCLUDED": "Налог включен в цену"
        }
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.region.update
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.region.update',
          {
              id: 1,
              fields: {
                  title: 'Россия (Пользовательский)',
                  formatDate: 'YYYY-MM-DD',
                  phrases: {
                      TAX_INCLUDED: 'Налог включен в цену'
                  }
              }
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
          'documentgenerator.region.update',
          [
              'id' => 1,
              'fields' => [
                  'title' => 'Россия (Пользовательский)',
                  'formatDate' => 'YYYY-MM-DD',
                  'phrases' => [
                      'TAX_INCLUDED' => 'Налог включен в цену',
                  ],
              ],
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
      'documentgenerator.region.update',
      {
          id: 1,
          fields: {
              title: 'Россия (Пользовательский)',
              formatDate: 'YYYY-MM-DD',
              phrases: {
                  TAX_INCLUDED: 'Налог включен в цену'
              }
          }
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
      'documentgenerator.region.update',
      [
          'id' => 1,
          'fields' => [
              'title' => 'Россия (Пользовательский)',
              'formatDate' => 'YYYY-MM-DD',
              'phrases' => [
                  'TAX_INCLUDED' => 'Налог включен в цену',
              ],
          ],
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
        "region": {
            "id": "1",
            "title": "Россия (Пользовательский)",
            "languageId": "ru",
            "formatDate": "YYYY-MM-DD",
            "formatDatetime": "DD.MM.YYYY HH:MI:SS",
            "formatName": "#LAST_NAME# #NAME# #SECOND_NAME#",
            "phrases": {
                "TAX_INCLUDED": "Налог включен в цену",
                "TAX_NOT_INCLUDED": "НДС не включен в цену"
            }
        }
    },
    "time": {
        "start": 1774505427,
        "finish": 1774505427.737558,
        "duration": 0.7375578880310059,
        "processing": 0,
        "date_start": "2026-03-26T09:10:27+03:00",
        "date_finish": "2026-03-26T09:10:27+03:00",
        "operating_reset_at": 1774506027,
        "operating": 0.13835597038269043
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
|| **region**
[`object`](../../data-types.md) | Данные региона [(подробное описание)](#region) ||
|#

#### Объект region {#region}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор пользовательского региона ||
|| **title**
[`string`](../../data-types.md) | Название региона ||
|| **languageId**
[`string`](../../data-types.md) | Идентификатор языка региона ||
|| **formatDate**
[`string`](../../data-types.md) | Формат даты ||
|| **formatDatetime**
[`string`](../../data-types.md) | Формат даты и времени ||
|| **formatName**
[`string`](../../data-types.md) | Шаблон полного имени ||
|| **phrases**
[`object`](../../data-types.md) | Набор фраз в формате `код: текст`, где ключи и значения строковые.

Примеры ключей: `TAX_INCLUDED`, `TAX_NOT_INCLUDED`

Список полей шаблона можно получить методом [documentgenerator.template.getfields](../templates/document-generator-template-get-fields.md)
||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Регион не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {id} | Обязательный параметр `id` не передан ||
|| `400` | `0` | Регион не найден | В параметре `id` указан несуществующий регион ||
|| `400` | `100` | Could not find value for parameter {fields} | Обязательный параметр `fields` не передан ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав на изменение шаблонов генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-region-add.md)
- [{#T}](./document-generator-region-get.md)
- [{#T}](./document-generator-region-list.md)
- [{#T}](./document-generator-region-delete.md)
