# Обновить элемент хранилища entity.item.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `X` (управление) в хранилище данных

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %}


## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Идентификатор хранилища данных приложения. Используйте значение, которое указали при создании хранилища.

Получить идентификатор можно методом [entity.get](../entities/entity-get.md) ||
|| **ID**^*^
[`integer`](../../data-types.md) | Идентификатор элемента хранилища 

Получить идентификатор элемента хранилища можно методом [entity.item.get](./entity-item-get.md)||
|| **NAME**
[`string`](../../data-types.md) | Новое название элемента хранилища ||
|| **PROPERTY_VALUES**
[`object`](../../data-types.md) | Значения свойств элемента в формате `{"КОД_СВОЙСТВА": значение}`.

Список доступных кодов свойств можно получить методом [entity.item.property.get](./properties/entity-item-property-get.md).

Для свойств типа файл используется формат из статьи [Как загрузить файлы](../../files/how-to-upload-files.md) ||
|| **SECTION**
[`integer`](../../data-types.md) | Идентификатор раздела хранилища ||
|| **DATE_ACTIVE_FROM**
[`datetime`](../../data-types.md) | Дата начала активности элемента ||
|| **DATE_ACTIVE_TO**
[`datetime`](../../data-types.md) | Дата окончания активности элемента ||
|| **PREVIEW_PICTURE**
[`file`](../../data-types.md) | Картинка анонса элемента. Формат файла — в статье [Как загрузить файлы](../../files/how-to-upload-files.md).

Если передать `false`, картинка будет удалена ||
|| **DETAIL_PICTURE**
[`file`](../../data-types.md) | Детальная картинка элемента. Формат файла — в статье [Как загрузить файлы](../../files/how-to-upload-files.md).

Если передать `false`, картинка будет удалена ||
|| **UF_**
[`any`](../../data-types.md) | Пользовательские поля элемента `UF_*`.

Передаются отдельными параметрами в формате `"UF_КОД": значение`, например: `"UF_CRM_1_COLOR": "red"`, `"UF_CRM_1_SIZE": 42` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример обновления элемента, где:
- `ENTITY` — идентификатор хранилища `dish`
- `ID` — идентификатор элемента `2333`
- `NAME` — новое название
- `PROPERTY_VALUES` — обновляемые значения свойств
- `SECTION` — идентификатор раздела

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","ID":2333,"NAME":"Hello, updated world!","PROPERTY_VALUES":{"test":33,"test1":44},"SECTION":219,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.item.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'entity.item.update',
        params: {
          ENTITY: 'dish',
          ID: 2333,
          NAME: 'Hello, updated world!',
          PROPERTY_VALUES: {
            test: 33,
            test1: 44,
          },
          SECTION: 219,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Item updated:', result)
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
      async function updateEntityItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'entity.item.update',
            params: {
              ENTITY: 'dish',
              ID: 2333,
              NAME: 'Hello, updated world!',
              PROPERTY_VALUES: {
                test: 33,
                test1: 44,
              },
              SECTION: 219,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Item updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateEntityItem)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.item.update',
                [
                    'ENTITY' => 'dish',
                    'ID' => 2333,
                    'NAME' => 'Hello, updated world!',
                    'PROPERTY_VALUES' => [
                        'test' => 33,
                        'test1' => 44,
                    ],
                    'SECTION' => 219,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating entity item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.update',
        {
            ENTITY: 'dish',
            ID: 2333,
            NAME: 'Hello, updated world!',
            PROPERTY_VALUES: {
                test: 33,
                test1: 44,
            },
            SECTION: 219,
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'entity.item.update',
        [
            'ENTITY' => 'dish',
            'ID' => 2333,
            'NAME' => 'Hello, updated world!',
            'PROPERTY_VALUES' => [
                'test' => 33,
                'test1' => 44,
            ],
            'SECTION' => 219,
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
    "result": true,
    "time": {
        "start": 1774437094,
        "finish": 1774437094.470878,
        "duration": 0.47087788581848145,
        "processing": 0,
        "date_start": "2026-03-25T14:11:34+03:00",
        "date_finish": "2026-03-25T14:11:34+03:00",
        "operating_reset_at": 1774437694,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат обновления элемента (`true` — успешно) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ITEM_NOT_FOUND",
    "error_description": "Item not found"
}
```

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'ENTITY' is null or empty",
    "argument": "ENTITY"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY` ||
|| `ERROR_ARGUMENT` | Argument 'ID' is null or empty | Параметр `ID` не передан или `<= 0` ||
|| `ERROR_ARGUMENT` | Ошибки валидатора полей элемента | Переданы невалидные входные поля ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ERROR_ITEM_NOT_FOUND` | Item not found | Элемент с переданным `ID` не найден в хранилище ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для обновления элемента ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|| `ERROR_CORE` | Internal error updating entity item. Try updating again. | Внутренняя ошибка при обновлении элемента ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-item-add.md)
- [{#T}](./entity-item-get.md)
- [{#T}](./entity-item-delete.md)
- [{#T}](./properties/index.md)
