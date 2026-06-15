# Получить список специальных страниц сайта landing.syspage.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтение» для сайта

Метод `landing.syspage.get` возвращает список специальных страниц сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md) ||
|| **active**
[`boolean`](../../../data-types.md) | Возвращать только страницы, которые не удалены и активны. 

Фильтр считается включенным, если передать `true`. По умолчанию — `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 1390,
        "active": true
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.syspage.get.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 1390,
        "active": true,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.syspage.get.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SyspageItem = {
      TYPE: string,
      LANDING_ID: string,
      TITLE: string,
      DELETED: string,
      ACTIVE: string,
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SyspageGetResult = Record<string, SyspageItem>

    try {
      const response = await $b24.actions.v2.call.make<SyspageGetResult>({
        method: 'landing.syspage.get',
        params: {
          id: 1390,
          active: true,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(Object.keys(result).map(key => result[key]))
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
      async function getSyspages() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.syspage.get',
            params: {
              id: 1390,
              active: true,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(Object.keys(result).map(key => result[key]))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSyspages)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.syspage.get',
                [
                    'id' => 1390,
                    'active' => true,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting special pages: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.syspage.get',
        {
            id: 1390,
            active: true
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.syspage.get',
        [
            'id' => 1390,
            'active' => true,
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "mainpage": {
            "TYPE": "mainpage",
            "LANDING_ID": "711",
            "TITLE": "Классический магазин. Одежда",
            "DELETED": "N",
            "ACTIVE": "Y"
        },
        "catalog": {
            "TYPE": "catalog",
            "LANDING_ID": "713",
            "TITLE": "Каталог",
            "DELETED": "N",
            "ACTIVE": "Y"
        },
        "personal": {
            "TYPE": "personal",
            "LANDING_ID": "717",
            "TITLE": "Персональный раздел",
            "DELETED": "N",
            "ACTIVE": "Y"
        },
        "cart": {
            "TYPE": "cart",
            "LANDING_ID": "2261",
            "TITLE": "Корзина",
            "DELETED": "N",
            "ACTIVE": "Y"
        },
        "order": {
            "TYPE": "order",
            "LANDING_ID": "721",
            "TITLE": "Оформление заказа",
            "DELETED": "N",
            "ACTIVE": "Y"
        },
        "compare": {
            "TYPE": "compare",
            "LANDING_ID": "749",
            "TITLE": "Сравнение",
            "DELETED": "N",
            "ACTIVE": "Y"
        },
        "payment": {
            "TYPE": "payment",
            "LANDING_ID": "751",
            "TITLE": "Оплата заказа",
            "DELETED": "N",
            "ACTIVE": "Y"
        }
    },
    "time": {
        "start": 1774349441,
        "finish": 1774349441.726663,
        "duration": 0.7266631126403809,
        "processing": 0,
        "date_start": "2026-03-24T13:50:41+03:00",
        "date_finish": "2026-03-24T13:50:41+03:00",
        "operating_reset_at": 1774350041,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`any`](../../../data-types.md) | Результат выполнения запроса.

Метод возвращает объект со специальными страницами, сгруппированными по коду типа [(подробное описание)](#result).

Если сайт не найден или у пользователя нет права «чтение» сайта, метод вернет `null`. 

Если доступ к сайту есть, но специальные страницы не назначены, метод вернет пустой объект `{}`. Такой же ответ вернется, если включен фильтр `active = true` и ни одна страница ему не соответствует ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **код типа**
[`object`](../../../data-types.md) | Объект привязки специальной страницы [(подробное описание)](#syspage-item)

Ключ объекта `result`.

Возможные значения:
`mainpage` — главная страница
`catalog` — главная страница каталога
`personal` — персональный раздел
`cart` — корзина
`order` — оформление заказа
`payment` — страница оплаты
`compare` — страница сравнения
`feedback` — страница обратной связи ||
|#

#### Объект привязки специальной страницы {#syspage-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE**
[`string`](../../../data-types.md) | Код типа специальной страницы.

Значение совпадает с ключом в объекте `result` ||
|| **LANDING_ID**
[`string`](../../../data-types.md) | Идентификатор страницы, назначенной специальной для сайта.

В ответе приходит строкой ||
|| **TITLE**
[`string`](../../../data-types.md) | Название страницы ||
|| **DELETED**
[`string`](../../../data-types.md) | Флаг удаления страницы.

Возможные значения:
`Y` — страница удалена
`N` — страница не удалена ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Флаг активности страницы.

Возможные значения:
`Y` — страница активна
`N` — страница неактивна ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: id"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ACCESS_DENIED` | Доступ к вызову метода запрещен: у пользователя нет доступа к методу или к модулю `landing` ||
|| `TYPE_ERROR` | Ошибка типа данных в параметре `id` ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-syspage-set.md)
- [{#T}](./landing-syspage-get-special-page.md)
- [{#T}](./landing-syspage-delete-for-landing.md)
- [{#T}](./landing-syspage-delete-for-site.md)
