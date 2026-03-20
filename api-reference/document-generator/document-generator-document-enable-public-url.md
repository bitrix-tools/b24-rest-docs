# Включить или выключить публичную ссылку на документ documentgenerator.document.enablepublicurl

> Scope: [`documentgenerator`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение документов

Метод `documentgenerator.document.enablepublicurl` включает или выключает публичную ссылку на документ.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор документа.

Получить идентификатор документа можно после [создания документа](./document-generator-document-add.md) или методом [получения списка документов](./document-generator-document-list.md) ||
|| **status**
[`integer`](../data-types.md) | Статус публичной ссылки:
- `1` - включить
- `0` - выключить

По умолчанию `1` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":51,"status":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.document.enablepublicurl
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":51,"status":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.document.enablepublicurl
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.document.enablepublicurl',
          {
              id: 51,
              status: 1
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
          'documentgenerator.document.enablepublicurl',
          [
              'id' => 51,
              'status' => 1,
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
      'documentgenerator.document.enablepublicurl',
      {
          id: 51,
          status: 1
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
      'documentgenerator.document.enablepublicurl',
      [
          'id' => 51,
          'status' => 1,
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
            "publicUrl": "https://mysite.ru/~nULUE"
    },
    "time": {
        "start": 1773913277,
        "finish": 1773913278.018128,
        "duration": 1.0181279182434082,
        "processing": 1,
        "date_start": "2026-03-19T12:41:17+03:00",
        "date_finish": "2026-03-19T12:41:18+03:00",
        "operating_reset_at": 1773913877,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **publicUrl**
[`string`](../data-types.md) | Публичная ссылка на документ

Если в `status` передать значение `0`, в поле вернется `null` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Документ не найден"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Bitrix\DocumentGenerator\Document constructor must be is public | Не передан обязательный параметр `id` ||
|| `400` | `0` | Документ не найден | Документ с указанным `id` не найден ||
|| `400` | `0` | You do not have permissions to view documents | Недостаточно прав на изменение документа ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-document-add.md)
- [{#T}](./document-generator-document-update.md)
- [{#T}](./document-generator-document-get.md)
- [{#T}](./document-generator-document-list.md)
- [{#T}](./document-generator-document-delete.md)
- [{#T}](./document-generator-document-get-fields.md)
