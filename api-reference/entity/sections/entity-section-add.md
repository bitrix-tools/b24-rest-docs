# Добавить раздел хранилища entity.section.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `W` (запись) или `X` (управление) на хранилище данных

Метод `entity.section.add` добавляет раздел в хранилище данных приложения.

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
|| **NAME**^*^
[`string`](../../data-types.md) | Название раздела ||
|| **SECTION**
[`integer`](../../data-types.md) | Идентификатор родительского раздела. ||
|| **ACTIVE**
[`string`](../../data-types.md) | Флаг активности раздела:
- `Y` — раздел активен
- `N` — раздел неактивен ||
|| **SORT**
[`integer`](../../data-types.md) | Индекс сортировки раздела ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код раздела ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание раздела ||
|| **PICTURE**
[`file`](../../data-types.md) | Картинка раздела. Формат файла — в статье [Как загрузить файлы](../../files/how-to-upload-files.md) ||
|| **DETAIL_PICTURE**
[`file`](../../data-types.md) | Детальная картинка раздела. Формат файла — в статье [Как загрузить файлы](../../files/how-to-upload-files.md) ||
|| **UF_**
[`object`](../../data-types.md) | Пользовательские поля раздела `UF_*` в формате `{"UF_КОД": значение}` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример добавления раздела в хранилище `dish`:
- `ENTITY` — идентификатор хранилища
- `NAME` — название раздела
- `SECTION` — родительский раздел `671`
- `ACTIVE`, `SORT`, `CODE`, `DESCRIPTION` — основные параметры
- `PICTURE`, `DETAIL_PICTURE` — файлы в формате [Как загрузить файлы](../../files/how-to-upload-files.md)

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","NAME":"Тестовый раздел","SECTION":671,"ACTIVE":"Y","SORT":500,"CODE":"testovyy-razdel","DESCRIPTION":"Описание тестового раздела","PICTURE":["section.jpg","**base64_section_image**"],"DETAIL_PICTURE":["section-detail.jpg","**base64_section_detail_image**"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.section.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'entity.section.add',
        params: {
          ENTITY: 'dish',
          NAME: 'Test section',
          SECTION: 671,
          ACTIVE: 'Y',
          SORT: 500,
          CODE: 'testovyy-razdel',
          DESCRIPTION: 'Test section description',
          PICTURE: ['section.jpg', '**base64_section_image**'],
          DETAIL_PICTURE: ['section-detail.jpg', '**base64_section_detail_image**'],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created section ID:', result)
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
      async function addEntitySection() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'entity.section.add',
            params: {
              ENTITY: 'dish',
              NAME: 'Test section',
              SECTION: 671,
              ACTIVE: 'Y',
              SORT: 500,
              CODE: 'testovyy-razdel',
              DESCRIPTION: 'Test section description',
              PICTURE: ['section.jpg', '**base64_section_image**'],
              DETAIL_PICTURE: ['section-detail.jpg', '**base64_section_detail_image**'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created section ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addEntitySection)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.section.add',
                [
                    'ENTITY' => 'dish',
                    'NAME' => 'Тестовый раздел',
                    'SECTION' => 671,
                    'ACTIVE' => 'Y',
                    'SORT' => 500,
                    'CODE' => 'testovyy-razdel',
                    'DESCRIPTION' => 'Описание тестового раздела',
                    'PICTURE' => ['section.jpg', '**base64_section_image**'],
                    'DETAIL_PICTURE' => ['section-detail.jpg', '**base64_section_detail_image**'],
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
        echo 'Error adding entity section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.section.add',
        {
            ENTITY: 'dish',
            NAME: 'Тестовый раздел',
            SECTION: 671,
            ACTIVE: 'Y',
            SORT: 500,
            CODE: 'testovyy-razdel',
            DESCRIPTION: 'Описание тестового раздела',
            PICTURE: ['section.jpg', '**base64_section_image**'],
            DETAIL_PICTURE: ['section-detail.jpg', '**base64_section_detail_image**'],
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
        'entity.section.add',
        [
            'ENTITY' => 'dish',
            'NAME' => 'Тестовый раздел',
            'SECTION' => 671,
            'ACTIVE' => 'Y',
            'SORT' => 500,
            'CODE' => 'testovyy-razdel',
            'DESCRIPTION' => 'Описание тестового раздела',
            'PICTURE' => ['section.jpg', '**base64_section_image**'],
            'DETAIL_PICTURE' => ['section-detail.jpg', '**base64_section_detail_image**'],
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
    "result": 673,
    "time": {
        "start": 1774275397,
        "finish": 1774275397.576672,
        "duration": 0.5766720771789551,
        "processing": 0,
        "date_start": "2026-03-23T17:16:37+03:00",
        "date_finish": "2026-03-23T17:16:37+03:00",
        "operating_reset_at": 1774275997,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного раздела ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ENTITY_NOT_FOUND",
    "error_description": "Entity not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY` ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для создания раздела ||
|| `ERROR_CORE` | Internal error adding entity section. Try adding again. | Внутренняя ошибка при создании раздела ||
|| `ERROR_CORE` | Неверный раздел-родитель! | Передан невалидный `SECTION` ||
|| `ERROR_CORE` | Код блока раздела не совпадает с кодом блока раздела-родителя! | Родительский раздел принадлежит другому хранилищу ||
|| `ERROR_CORE` | Неверный тип файла | Передан файл неподдерживаемого типа в `PICTURE` или `DETAIL_PICTURE` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-section-update.md)
- [{#T}](./entity-section-get.md)
- [{#T}](./entity-section-delete.md)
- [{#T}](./index.md)
