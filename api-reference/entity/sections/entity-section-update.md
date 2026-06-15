# Обновить раздел хранилища entity.section.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `W` (запись) или `X` (управление) на хранилище данных

Метод `entity.section.update` обновляет раздел хранилища данных приложения.

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
[`integer`](../../data-types.md) | Идентификатор раздела для обновления ||
|| **NAME**
[`string`](../../data-types.md) | Название раздела ||
|| **SECTION**
[`integer`](../../data-types.md) | Идентификатор родительского раздела ||
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

Пример обновления раздела, где:
- `ENTITY` — идентификатор хранилища `dish`
- `ID` — идентификатор раздела `673`
- обновляются все основные параметры: `NAME`, `SECTION`, `ACTIVE`, `SORT`, `CODE`, `DESCRIPTION`, `PICTURE`, `DETAIL_PICTURE`, `UF_*`

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","ID":673,"NAME":"Тестовый раздел (обновлен)","SECTION":671,"ACTIVE":"Y","SORT":550,"CODE":"testovyy-razdel-updated","DESCRIPTION":"Обновленное описание","PICTURE":["section.jpg","**base64_section_image**"],"DETAIL_PICTURE":["section-detail.jpg","**base64_section_detail_image**"],"UF_COLOR":"#ff6600","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.section.update
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
        method: 'entity.section.update',
        params: {
          ENTITY: 'dish',
          ID: 673,
          NAME: 'Test section (updated)',
          SECTION: 671,
          ACTIVE: 'Y',
          DESCRIPTION: 'Updated description',
          CODE: 'testovyy-razdel-updated',
          SORT: 550,
          PICTURE: ['section.jpg', '**base64_section_image**'],
          DETAIL_PICTURE: ['section-detail.jpg', '**base64_section_detail_image**'],
          UF_COLOR: '#ff6600',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Section updated:', result)
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
      async function updateEntitySection() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'entity.section.update',
            params: {
              ENTITY: 'dish',
              ID: 673,
              NAME: 'Test section (updated)',
              SECTION: 671,
              ACTIVE: 'Y',
              DESCRIPTION: 'Updated description',
              CODE: 'testovyy-razdel-updated',
              SORT: 550,
              PICTURE: ['section.jpg', '**base64_section_image**'],
              DETAIL_PICTURE: ['section-detail.jpg', '**base64_section_detail_image**'],
              UF_COLOR: '#ff6600',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Section updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateEntitySection)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.section.update',
                [
                    'ENTITY' => 'dish',
                    'ID' => 673,
                    'NAME' => 'Тестовый раздел (обновлен)',
                    'SECTION' => 671,
                    'ACTIVE' => 'Y',
                    'DESCRIPTION' => 'Обновленное описание',
                    'CODE' => 'testovyy-razdel-updated',
                    'SORT' => 550,
                    'PICTURE' => ['section.jpg', '**base64_section_image**'],
                    'DETAIL_PICTURE' => ['section-detail.jpg', '**base64_section_detail_image**'],
                    'UF_COLOR' => '#ff6600',
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
        echo 'Error updating entity section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.section.update',
        {
            ENTITY: 'dish',
            ID: 673,
            NAME: 'Тестовый раздел (обновлен)',
            SECTION: 671,
            ACTIVE: 'Y',
            DESCRIPTION: 'Обновленное описание',
            CODE: 'testovyy-razdel-updated',
            SORT: 550,
            PICTURE: ['section.jpg', '**base64_section_image**'],
            DETAIL_PICTURE: ['section-detail.jpg', '**base64_section_detail_image**'],
            UF_COLOR: '#ff6600',
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
        'entity.section.update',
        [
            'ENTITY' => 'dish',
            'ID' => 673,
            'NAME' => 'Тестовый раздел (обновлен)',
            'SECTION' => 671,
            'ACTIVE' => 'Y',
            'DESCRIPTION' => 'Обновленное описание',
            'CODE' => 'testovyy-razdel-updated',
            'SORT' => 550,
            'PICTURE' => ['section.jpg', '**base64_section_image**'],
            'DETAIL_PICTURE' => ['section-detail.jpg', '**base64_section_detail_image**'],
            'UF_COLOR' => '#ff6600',
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
        "start": 1774341623,
        "finish": 1774341623.380336,
        "duration": 0.38033604621887207,
        "processing": 0,
        "date_start": "2026-03-24T11:40:23+03:00",
        "date_finish": "2026-03-24T11:40:23+03:00",
        "operating_reset_at": 1774342223,
        "operating": 0.1318378448486328
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат выполнения метода. Для успешного обновления возвращается `true` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_SECTION_NOT_FOUND",
    "error_description": "Section not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY` ||
|| `ERROR_ARGUMENT` | Argument 'ID' is null or empty | Параметр `ID` не передан или имеет значение `0` ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ERROR_SECTION_NOT_FOUND` | Section not found | Раздел с указанным `ID` не найден в этом хранилище ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для обновления раздела ||
|| `ERROR_CORE` | Internal error updating entity section. Try updating again. | Внутренняя ошибка при обновлении раздела ||
|| `ERROR_CORE` | Неверный тип файла | Передан файл неподдерживаемого типа в `PICTURE` или `DETAIL_PICTURE` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-section-add.md)
- [{#T}](./entity-section-get.md)
- [{#T}](./entity-section-delete.md)
- [{#T}](./index.md)

