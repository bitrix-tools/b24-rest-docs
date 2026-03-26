# Получить регион по идентификатору documentgenerator.region.get

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.region.get` возвращает данные региона по идентификатору или коду.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../data-types.md) | Идентификатор пользовательского региона или код предустановленного региона, например, `ru`.

Получить идентификатор можно после [создания региона](./document-generator-region-add.md) или методом [получения списка регионов](./document-generator-region-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"1"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.region.get
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"1","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.region.get
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.region.get',
          {
              id: '1'
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
          'documentgenerator.region.get',
          [
              'id' => '1',
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
      'documentgenerator.region.get',
      {
          id: '1'
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
      'documentgenerator.region.get',
      [
          'id' => '1',
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
        "start": 1774505900,
        "finish": 1774505900.746113,
        "duration": 0.7461130619049072,
        "processing": 0,
        "date_start": "2026-03-26T09:18:20+03:00",
        "date_finish": "2026-03-26T09:18:20+03:00",
        "operating_reset_at": 1774506500,
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
|| **region**
[`object`](../../data-types.md) | Данные региона [(подробное описание)](#region) ||
|#

#### Объект region {#region}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор пользовательского региона, для предустановленного региона поле может отсутствовать ||
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
[`object`](../../data-types.md) | Набор фраз в формате `код: текст` ||
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
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав на изменение шаблонов генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-region-add.md)
- [{#T}](./document-generator-region-update.md)
- [{#T}](./document-generator-region-list.md)
- [{#T}](./document-generator-region-delete.md)
