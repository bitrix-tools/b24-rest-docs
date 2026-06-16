# Получить отдел humanresources.node.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр отделов» или «Просмотр команд»

Метод `humanresources.node.get` возвращает отдел или команду по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор отдела или команды.

Идентификатор можно получить методом [humanresources.node.list](./humanresources-node-list.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей отдела, которые нужно вернуть.

Доступные поля:

- `id` — идентификатор отдела
- `name` — название отдела
- `type` — тип элемента структуры
- `structureId` — идентификатор структуры компании
- `parentId` — идентификатор родительского отдела
- `description` — описание отдела
- `accessCode` — код доступа отдела
- `userCount` — количество пользователей в отделе
- `colorName` — цвет команды
- `xmlId` — внешний идентификатор отдела
- `createdAt` — дата и время создания
- `updatedAt` — дата и время последнего обновления
- `members` — список пользователей отдела ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"select":["id","name","type","structureId","parentId","description","accessCode","userCount","colorName","xmlId","createdAt","updatedAt","members"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"select":["id","name","type","structureId","parentId","description","accessCode","userCount","colorName","xmlId","createdAt","updatedAt","members"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type NodeGetResult = {
      item: {
        id: number
        name: string
        type: string
        structureId: number
        parentId: number | null
        description: string
        accessCode: string
        userCount: number
        colorName: string | null
        xmlId: string | null
        createdAt: ISODate
        updatedAt: ISODate
        members: Array<{
          userId: number
          name: string
          workPosition: string
          role: string
          avatar: string
          url: string
        }>
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<NodeGetResult>({
        method: 'humanresources.node.get',
        params: {
          id: 1,
          select: [
            'id',
            'name',
            'type',
            'structureId',
            'parentId',
            'description',
            'accessCode',
            'userCount',
            'colorName',
            'xmlId',
            'createdAt',
            'updatedAt',
            'members',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item.id, result.item.name, result.item.type)
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
      async function getNode() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'humanresources.node.get',
            params: {
              id: 1,
              select: [
                'id',
                'name',
                'type',
                'structureId',
                'parentId',
                'description',
                'accessCode',
                'userCount',
                'colorName',
                'xmlId',
                'createdAt',
                'updatedAt',
                'members',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item.id, result.item.name, result.item.type)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getNode)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.node.get',
                [
                    'id' => 1,
                    'select' => [
                        'id',
                        'name',
                        'type',
                        'structureId',
                        'parentId',
                        'description',
                        'accessCode',
                        'userCount',
                        'colorName',
                        'xmlId',
                        'createdAt',
                        'updatedAt',
                        'members'
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.node.get',
        {
            id: 1,
            select: [
                'id',
                'name',
                'type',
                'structureId',
                'parentId',
                'description',
                'accessCode',
                'userCount',
                'colorName',
                'xmlId',
                'createdAt',
                'updatedAt',
                'members'
            ]
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'humanresources.node.get',
        [
            'id' => 1,
            'select' => [
                'id',
                'name',
                'type',
                'structureId',
                'parentId',
                'description',
                'accessCode',
                'userCount',
                'colorName',
                'xmlId',
                'createdAt',
                'updatedAt',
                'members'
            ]
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
    "result": {
        "item": {
            "id": 1,
            "name": "Отдел продаж",
            "type": "DEPARTMENT",
            "structureId": 1,
            "parentId": null,
            "description": "Основной отдел продаж",
            "accessCode": "DR1",
            "userCount": 18,
            "colorName": null,
            "xmlId": null,
            "createdAt": "2026-05-20T10:15:00+03:00",
            "updatedAt": "2026-06-02T10:30:00+03:00",
            "members": [
                {
                    "userId": 7,
                    "name": "Анна Смирнова",
                    "workPosition": "Руководитель отдела продаж",
                    "role": "MEMBER_HEAD",
                    "avatar": "https://example.bitrix24.ru/upload/main/1/avatar.jpg",
                    "url": "/company/personal/user/7/"
                }
            ]
        }
    },
    "time": {
        "start": 1780403400,
        "finish": 1780403400.213411,
        "duration": 0.2134110927581787,
        "processing": 0.1820049285888672,
        "date_start": "2026-06-02T15:30:00+03:00",
        "date_finish": "2026-06-02T15:30:00+03:00",
        "operating_reset_at": 1780404000,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../../data-types.md) | Объект с данными отдела или команды. Структура ответа зависит от `select` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `1` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права просматривать указанный отдел или команду  ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте scope `humanresources` ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с указанным идентификатором не найдена | Укажите идентификатор существующего отдела или команды ||
|#

#### Ошибки в параметре `select`

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `NodeDto` | Передайте только поля из списка `select` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк, например `["id","name"]` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-list.md)
- [{#T}](./humanresources-node-field-list.md)
- [{#T}](./index.md)
