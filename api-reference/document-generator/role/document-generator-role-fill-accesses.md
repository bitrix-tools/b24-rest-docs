# Привязать пользователей к ролям documentgenerator.role.fillaccesses

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение настроек генератора документов

Метод `documentgenerator.role.fillaccesses` полностью перезаписывает карту привязок ролей к кодам доступа.

{% note warning "" %}

Метод перезаписывает настройки полностью.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **accesses**
[`array`](../../data-types.md) | Массив привязок роли к коду доступа [(подробное описание)](#accesses) ||
|#

#### Элемент массива accesses {#accesses}

#|
|| **Название**
`тип` | **Описание** ||
|| **roleId***
[`integer`](../../data-types.md) | Идентификатор роли.

Получить идентификатор можно после [создания роли](./document-generator-role-add.md) или методом [получения списка ролей](./document-generator-role-list.md) ||
|| **accessCode***
[`string`](../../data-types.md) | Код доступа пользователя, группы или отдела.

Возможные значения:

- `U{id}` — пользователь
- `G{id}` — группа пользователей
- `AU` — все авторизованные пользователи
- `UA` — все пользователи
- `D{id}` — отдел
- `DR{id}` — отдел с подотделами
- `SG{id}` — рабочая группа или проект
- `SG{id}_A` — владелец рабочей группы или проекта
- `SG{id}_E` — модераторы рабочей группы или проекта
- `SG{id}_K` — все члены рабочей группы или проекта
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
      "accesses": [
        {
          "roleId": 9,
          "accessCode": "U1"
        },
        {
          "roleId": 9,
          "accessCode": "D1"
        },
        {
          "roleId": 9,
          "accessCode": "UA"
        }
      ]
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.role.fillaccesses
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "accesses": [
        {
          "roleId": 9,
          "accessCode": "U1"
        },
        {
          "roleId": 9,
          "accessCode": "D1"
        },
        {
          "roleId": 9,
          "accessCode": "UA"
        }
      ],
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.role.fillaccesses
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'documentgenerator.role.fillaccesses',
          {
              accesses: [
                  {
                      roleId: 9,
                      accessCode: 'U1'
                  },
                  {
                      roleId: 9,
                      accessCode: 'D1'
                  },
                  {
                      roleId: 9,
                      accessCode: 'UA'
                  }
              ]
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
          'documentgenerator.role.fillaccesses',
          [
              'accesses' => [
                  [
                      'roleId' => 9,
                      'accessCode' => 'U1',
                  ],
                  [
                      'roleId' => 9,
                      'accessCode' => 'D1',
                  ],
                  [
                      'roleId' => 9,
                      'accessCode' => 'UA',
                  ],
              ],
          ]
      );

      $result = $response->getResponseData()->getResult();
      var_dump($result);
  } catch (Throwable $e) {
      echo $e->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'documentgenerator.role.fillaccesses',
      {
          accesses: [
              {
                  roleId: 9,
                  accessCode: 'U1'
              },
              {
                  roleId: 9,
                  accessCode: 'D1'
              },
              {
                  roleId: 9,
                  accessCode: 'UA'
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
      'documentgenerator.role.fillaccesses',
      [
          'accesses' => [
              [
                  'roleId' => 9,
                  'accessCode' => 'U1',
              ],
              [
                  'roleId' => 9,
                  'accessCode' => 'D1',
              ],
              [
                  'roleId' => 9,
                  'accessCode' => 'UA',
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
    "result": null,
    "time": {
        "start": 1773914210,
        "finish": 1773914211.747039,
        "duration": 1.7470390796661377,
        "processing": 1,
        "date_start": "2026-03-19T12:56:50+03:00",
        "date_finish": "2026-03-19T12:56:51+03:00",
        "operating_reset_at": 1773914810,
        "operating": 1.222714900970459
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`null` | Метод применяет новые привязки и возвращает `null`.

Также возвращает `null` без ошибок:
- если не передан обязательный параметр `accesses` 
- передан несуществующий `roleId`
- передан несуществующий `accessCode` 
||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `400` | `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле "ROLE_ID" | В одном из элементов `accesses` не передан `roleId` ||
|| `400` | `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле "ACCESS_CODE" | В одном из элементов `accesses` не передан `accessCode` ||
|| `400` | `0` | You do not have permissions to modify settings | Недостаточно прав на изменение настроек генератора документов ||
|| `403` | `DOCGEN_ACCESS_ERROR` | Your plan does not support this operation | На тарифе недоступна функция разграничения прав для генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-role-add.md)
- [{#T}](./document-generator-role-update.md)
- [{#T}](./document-generator-role-get.md)
- [{#T}](./document-generator-role-list.md)
- [{#T}](./document-generator-role-delete.md)
