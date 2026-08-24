# Получить статус звонка getStatus

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../scopes/permissions.md) — доступ к точке встраивания карточки звонка
>
> Кто может выполнять команду: любой пользователь

Команда `getStatus` возвращает текущие данные карточки звонка.

{% note info "" %}

Команда работает в контексте приложения, открытого в точке встраивания `CALL_CARD`. Это команда js-интерфейса, а не метод REST: вызвать ее запросом к `/rest/` нельзя.

{% endnote %}

## Как вызвать команду

Команду вызывают из виджета методом [BX24.placement.call](../bx24-placement-call.md). Третий аргумент — функция обратного вызова, в нее приходит результат команды.

```js
BX24.placement.call('getStatus', {}, function (result) {
    console.log(result);
});
```

## Параметры команды

Команда не принимает параметров. Вторым аргументом передайте пустой объект `{}`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            BX24.placement.call('getStatus', {}, function (result) {
                console.log(result);
            });
        });
    });
    ```

- JS (TS)

    ```ts
    // $b24 — инициализированный экземпляр SDK, см. руководство по началу работы
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // форма результата описана ниже на этой странице
    type CallStatus = {
      CALL_ID: string
      PHONE_NUMBER?: string
      LINE_NUMBER: string
      LINE_NAME: string
      CRM_ENTITY_TYPE: string
      CRM_ENTITY_ID: number
      CRM_ACTIVITY_ID?: number | string
      CRM_BINDINGS: Array<{ ENTITY_TYPE: string; ENTITY_ID: number }>
      CALL_DIRECTION: string
      CALL_STATE: string
      CALL_LIST_MODE: boolean
    }

    const status = await $b24.placement.call('getStatus') as CallStatus

    console.log(status.CALL_ID, status.CALL_STATE)
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        const result = await $b24.placement.call('getStatus')

        console.log(result)
      })
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.placement.call(
            placement='getStatus',
            params={},
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```
- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.call',
                [
                    'PLACEMENT' => 'getStatus',
                    'PARAMS' => []
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.call',
        {
            PLACEMENT: 'getStatus',
            PARAMS: {}
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
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
        'placement.call',
        [
            'PLACEMENT' => 'getStatus',
            'PARAMS' => (object)[]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Результат команды

```json
{
    "CALL_ID": "E45D40253D1C2D2F.1774588815.822533",
    "PHONE_NUMBER": "+79999996666",
    "LINE_NUMBER": "reg151083",
    "LINE_NAME": "",
    "CRM_ENTITY_TYPE": "CONTACT",
    "CRM_ENTITY_ID": 797,
    "CRM_ACTIVITY_ID": 12043,
    "CRM_BINDINGS": [
        {
        "ENTITY_TYPE": "DEAL",
        "ENTITY_ID": 4615
        },
        {
        "ENTITY_TYPE": "COMPANY",
        "ENTITY_ID": 643
        }
    ],
    "CALL_DIRECTION": "outgoing",
    "CALL_STATE": "idle",
    "CALL_LIST_MODE": false
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **CALL_ID**
[`string`](../../../data-types.md) | Идентификатор звонка ||
|| **PHONE_NUMBER**
[`string`](../../../data-types.md) | Номер клиента.

Возможные состояния:

- номер клиента — обычный случай
- `hidden` — клиент скрыл свой номер
- ключ не приходит вовсе — номер не определен ||
|| **LINE_NUMBER**
[`string`](../../../data-types.md) | Номер линии ||
|| **LINE_NAME**
[`string`](../../../data-types.md) | Название телефонной линии компании.

Может быть пустой строкой, если название линии не задано ||
|| **CRM_ENTITY_TYPE**
[`string`](../../../data-types.md) | Символьный код типа элемента CRM, к которому привязан звонок: `LEAD`, `DEAL`, `CONTACT` или `COMPANY`.

Пустая строка, если звонок не привязан к CRM ||
|| **CRM_ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор элемента CRM, к которому привязан звонок.

`0`, если звонок не привязан к CRM. Полный список связанных элементов приходит в `CRM_BINDINGS` ||
|| **CRM_ACTIVITY_ID**
[`integer`](../../../data-types.md) | Идентификатор дела CRM, созданного для звонка.

Если дела нет, ключ не приходит вовсе или приходит пустой строкой ||
|| **CRM_BINDINGS**
[`object[]`](../../../data-types.md) | Привязки звонка к объектам CRM [(подробное описание)](#crm_bindings) ||
|| **CALL_DIRECTION**
[`string`](../../../data-types.md) | Направление звонка.

Возможные значения:

- `incoming` — входящий звонок
- `outgoing` — исходящий звонок
- `callback` — обратный звонок ||
|| **CALL_STATE**
[`string`](../../../data-types.md) | Состояние звонка.

Возможные значения:

- `idle` — соединение отсутствует
- `connecting` — выполняется установка соединения
- `connected` — соединение установлено ||
|| **CALL_LIST_MODE**
[`boolean`](../../../data-types.md) | Признак режима обзвона ||
|#

### Параметр CRM_BINDINGS{#crm_bindings}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип объекта CRM: `LEAD`, `DEAL`, `CONTACT` или `COMPANY` ||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) | Идентификатор объекта CRM ||
|#

## Ошибки

Собственных кодов ошибок у команды `getStatus` нет: она либо выполняется, либо не вызывается вовсе.

- Если виджет открыт не в точке встраивания `CALL_CARD`, интерфейс точки встраивания игнорирует незнакомую команду и функция обратного вызова не срабатывает
- Имя команды сверяйте с учетом регистра: список команд, доступных в текущей точке встраивания, возвращает [BX24.placement.getInterface](../bx24-placement-get-interface.md)

## Продолжите изучение

- [{#T}](./disable-auto-close.md)
- [{#T}](./enable-auto-close.md)
- [{#T}](./call-card-entity-changed.md)
- [{#T}](./call-card-before-close.md)
- [{#T}](./call-card-call-state-changed.md)
- [{#T}](./index.md)
- [{#T}](../../telephony/call-card.md)
