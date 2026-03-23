# Получить роль по идентификатору documentgenerator.role.get

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение настроек генератора документов

Метод `documentgenerator.role.get` возвращает информацию о роли и ее правах доступа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор роли.

Получить идентификатор можно после [создания роли](./document-generator-role-add.md) или методом [получения списка ролей](./document-generator-role-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.role.get
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":9,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.role.get
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.role.get',
          {
              id: 9
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
          'documentgenerator.role.get',
          [
              'id' => 9,
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
      'documentgenerator.role.get',
      {
          id: 9
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
      'documentgenerator.role.get',
      [
          'id' => 9,
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
        "role": {
            "id": 9,
            "name": "Редакторы своих шаблонов",
            "code": "DOCGEN_TEMPLATE_EDITORS",
            "permissions": {
                "settings": {
                    "modify": ""
                },
                "templates": {
                    "modify": "A"
                },
                "documents": {
                    "modify": "X",
                    "view": "X"
                }
            }
        }
    },
    "time": {
        "start": 1774014973,
        "finish": 1774014974.093322,
        "duration": 1.0933220386505127,
        "processing": 0,
        "date_start": "2026-03-20T16:56:13+03:00",
        "date_finish": "2026-03-20T16:56:14+03:00",
        "operating_reset_at": 1774015574,
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
|| **role**
[`object`](../../data-types.md) | Данные роли [(подробное описание)](#role) ||
|#

#### Объект role {#role}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор роли ||
|| **name**
[`string`](../../data-types.md) | Название роли ||
|| **code**
[`string`](../../data-types.md) | Символьный код роли ||
|| **permissions**
[`object`](../../data-types.md) | Права роли [(подробное описание)](#permissions) ||
|#

#### Объект permissions {#permissions}

#|
|| **Название**
`тип` | **Описание** ||
|| **settings**
[`object`](../../data-types.md) | Права на настройки [(подробное описание)](#permissions-settings) ||
|| **templates**
[`object`](../../data-types.md) | Права на шаблоны [(подробное описание)](#permissions-templates) ||
|| **documents**
[`object`](../../data-types.md) | Права на документы [(подробное описание)](#permissions-documents) ||
|#

#### Объект settings {#permissions-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **modify**
[`string`](../../data-types.md) | Уровень доступа к настройкам. Возможные значения:
- `""` — нет доступа
- `X` — полный доступ
||
|#

#### Объект templates {#permissions-templates}

#|
|| **Название**
`тип` | **Описание** ||
|| **modify**
[`string`](../../data-types.md) | Уровень доступа к шаблонам. Возможные значения:
- `""` — нет доступа
- `A` — только свои элементы
- `D` — свои и коллег по отделу
- `X` — полный доступ
 ||
|#

#### Объект documents {#permissions-documents}

#|
|| **Название**
`тип` | **Описание** ||
|| **modify**
[`string`](../../data-types.md) | Уровень доступа на изменение документов. Возможные значения:
- `""` — нет доступа
- `X` — полный доступ
||
|| **view**
[`string`](../../data-types.md) | Уровень доступа на просмотр документов. Возможные значения:
- `""` — нет доступа
- `X` — полный доступ
||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "0",
    "error_description": "You do not have permissions to modify settings"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Bitrix\DocumentGenerator\Model\Role All parameters in the constructor must have real class type | Не передан обязательный параметр `id` ||
|| `400` | `100` | Could not construct parameter {role} | Передан несуществующий параметр `id` ||
|| `400` | `0` | You do not have permissions to modify settings | Недостаточно прав на изменение настроек генератора документов ||
|| `403` | `DOCGEN_ACCESS_ERROR` | Your plan does not support this operation | На тарифе недоступна функция разграничения прав для генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-role-add.md)
- [{#T}](./document-generator-role-update.md)
- [{#T}](./document-generator-role-list.md)
- [{#T}](./document-generator-role-delete.md)
- [{#T}](./document-generator-role-fill-accesses.md)
