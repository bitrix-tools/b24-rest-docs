# Добавить роль documentgenerator.role.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение настроек генератора документов

Метод `documentgenerator.role.add` добавляет новую роль.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Поля роли [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название роли ||
|| **code**
[`string`](../../data-types.md) | Символьный код роли ||
|| **permissions**
[`object`](../../data-types.md) | Права роли [(подробное описание)](#permissions).

{% note warning "" %}

Ключи внутри `permissions` чувствительны к регистру. Передавайте только в верхнем регистре:
- `SETTINGS`, `TEMPLATES`, `DOCUMENTS`
- `MODIFY`, `VIEW`

Если передать ключи в нижнем регистре, роль сохранится, но права будут пустыми.

{% endnote %}
||
|#

#### Объект permissions {#permissions}

#|
|| **Название**
`тип` | **Описание** ||
|| **SETTINGS**
[`object`](../../data-types.md) | Права на настройки [(подробное описание)](#permissions-settings) ||
|| **TEMPLATES**
[`object`](../../data-types.md) | Права на шаблоны [(подробное описание)](#permissions-templates) ||
|| **DOCUMENTS**
[`object`](../../data-types.md) | Права на документы [(подробное описание)](#permissions-documents) ||
|#

#### Объект settings {#permissions-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **MODIFY**
[`string`](../../data-types.md) | Уровень доступа к настройкам. Возможные значения:
- `""` — нет доступа
- `X` — полный доступ
||
|#

#### Объект templates {#permissions-templates}

#|
|| **Название**
`тип` | **Описание** ||
|| **MODIFY**
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
|| **MODIFY**
[`string`](../../data-types.md) | Уровень доступа на изменение документов. Возможные значения:
- `""` — нет доступа
- `X` — полный доступ
||
|| **VIEW**
[`string`](../../data-types.md) | Уровень доступа на просмотр документов. Возможные значения:
- `""` — нет доступа
- `X` — полный доступ
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
      "fields": {
        "name": "Редакторы шаблонов",
        "code": "DOCGEN_TEMPLATE_EDITORS",
        "permissions": {
          "SETTINGS": {
            "MODIFY": ""
          },
          "TEMPLATES": {
            "MODIFY": "D"
          },
          "DOCUMENTS": {
            "MODIFY": "X",
            "VIEW": "X"
          }
        }
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.role.add
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "fields": {
        "name": "Редакторы шаблонов",
        "code": "DOCGEN_TEMPLATE_EDITORS",
        "permissions": {
          "SETTINGS": {
            "MODIFY": ""
          },
          "TEMPLATES": {
            "MODIFY": "D"
          },
          "DOCUMENTS": {
            "MODIFY": "X",
            "VIEW": "X"
          }
        }
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.role.add
  ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type RoleAddResult = {
      role: {
        id: number
        name: string
        code: string
        permissions: {
          settings: {
            modify: string
          }
          templates: {
            modify: string
          }
          documents: {
            modify: string
            view: string
          }
        }
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<RoleAddResult>({
        method: 'documentgenerator.role.add',
        params: {
          fields: {
            name: 'Template Editors',
            code: 'DOCGEN_TEMPLATE_EDITORS',
            permissions: {
              SETTINGS: {
                MODIFY: '',
              },
              TEMPLATES: {
                MODIFY: 'D',
              },
              DOCUMENTS: {
                MODIFY: 'X',
                VIEW: 'X',
              },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added role:', result.role.id, result.role.name)
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
      async function addRole() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'documentgenerator.role.add',
            params: {
              fields: {
                name: 'Template Editors',
                code: 'DOCGEN_TEMPLATE_EDITORS',
                permissions: {
                  SETTINGS: {
                    MODIFY: '',
                  },
                  TEMPLATES: {
                    MODIFY: 'D',
                  },
                  DOCUMENTS: {
                    MODIFY: 'X',
                    VIEW: 'X',
                  },
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Added role:', result.role.id, result.role.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addRole)
    </script>
    ```

- PHP

  ```php
  try {
      $response = $b24Service->core->call(
          'documentgenerator.role.add',
          [
              'fields' => [
                  'name' => 'Редакторы шаблонов',
                  'code' => 'DOCGEN_TEMPLATE_EDITORS',
                  'permissions' => [
                      'SETTINGS' => [
                          'MODIFY' => '',
                      ],
                      'TEMPLATES' => [
                          'MODIFY' => 'D',
                      ],
                      'DOCUMENTS' => [
                          'MODIFY' => 'X',
                          'VIEW' => 'X',
                      ],
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
      'documentgenerator.role.add',
      {
          fields: {
              name: 'Редакторы шаблонов',
              code: 'DOCGEN_TEMPLATE_EDITORS',
              permissions: {
                  SETTINGS: {
                      MODIFY: ''
                  },
                  TEMPLATES: {
                      MODIFY: 'D'
                  },
                  DOCUMENTS: {
                      MODIFY: 'X',
                      VIEW: 'X'
                  }
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
      'documentgenerator.role.add',
      [
          'fields' => [
              'name' => 'Редакторы шаблонов',
              'code' => 'DOCGEN_TEMPLATE_EDITORS',
              'permissions' => [
                  'SETTINGS' => [
                      'MODIFY' => '',
                  ],
                  'TEMPLATES' => [
                      'MODIFY' => 'D',
                  ],
                  'DOCUMENTS' => [
                      'MODIFY' => 'X',
                      'VIEW' => 'X',
                  ],
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
        "role": {
            "id": 9,
            "name": "Редакторы шаблонов",
            "code": "DOCGEN_TEMPLATE_EDITORS",
            "permissions": {
                "settings": {
                    "modify": ""
                },
                "templates": {
                    "modify": "D"
                },
                "documents": {
                    "modify": "X",
                    "view": "X"
                }
            }
        }
    },
    "time": {
        "start": 1774008850,
        "finish": 1774008850.528288,
        "duration": 0.5282878875732422,
        "processing": 0,
        "date_start": "2026-03-20T15:14:10+03:00",
        "date_finish": "2026-03-20T15:14:10+03:00",
        "operating_reset_at": 1774009450,
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
[`object`](../../data-types.md) | Данные созданной роли [(подробное описание)](#result-role) ||
|#

#### Объект role {#result-role}

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
[`object`](../../data-types.md) | Права роли [(подробное описание)](#result-role-permissions) ||
|#

#### Объект permissions {#result-role-permissions}

#|
|| **Название**
`тип` | **Описание** ||
|| **settings**
[`object`](../../data-types.md) | Права на настройки [(подробное описание)](#result-role-permissions-settings) ||
|| **templates**
[`object`](../../data-types.md) | Права на шаблоны [(подробное описание)](#result-role-permissions-templates) ||
|| **documents**
[`object`](../../data-types.md) | Права на документы [(подробное описание)](#result-role-permissions-documents) ||
|#

#### Объект settings {#result-role-permissions-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **modify**
[`string`](../../data-types.md) | Уровень доступа к настройкам
Возможные значения:
- `""` — нет доступа
- `X` — полный доступ ||
|#

#### Объект templates {#result-role-permissions-templates}

#|
|| **Название**
`тип` | **Описание** ||
|| **modify**
[`string`](../../data-types.md) | Уровень доступа к шаблонам
Возможные значения:
- `""` — нет доступа
- `A` — только свои элементы
- `D` — свои и коллег по отделу
- `X` — полный доступ ||
|#

#### Объект documents {#result-role-permissions-documents}

#|
|| **Название**
`тип` | **Описание** ||
|| **modify**
[`string`](../../data-types.md) | Уровень доступа на изменение документов
Возможные значения:
- `""` — нет доступа
- `X` — полный доступ ||
|| **view**
[`string`](../../data-types.md) | Уровень доступа на просмотр документов
Возможные значения:
- `""` — нет доступа
- `X` — полный доступ ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "100",
    "error_description": "Could not find value for parameter {fields}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {fields} | Обязательный параметр `fields` не передан или передан пустым ||
|| `400` | `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле "NAME" | Не передано обязательное поле `name` в параметре `fields` ||
|| `400` | `0` | You do not have permissions to modify settings | Недостаточно прав на изменение настроек генератора документов ||
|| `403` | `DOCGEN_ACCESS_ERROR` | Your plan does not support this operation | На тарифе недоступна функция разграничения прав для генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-role-update.md)
- [{#T}](./document-generator-role-get.md)
- [{#T}](./document-generator-role-list.md)
- [{#T}](./document-generator-role-delete.md)
- [{#T}](./document-generator-role-fill-accesses.md)
