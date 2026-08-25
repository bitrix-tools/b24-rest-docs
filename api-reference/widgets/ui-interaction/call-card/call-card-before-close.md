# Событие перед закрытием карточки CallCard::BeforeClose

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../../scopes/permissions.md) — регистрация точки встраивания, [`telephony`](../../../scopes/permissions.md) — доступ к точке встраивания карточки звонка
>
> Кто может подписаться: любой пользователь

Событие `CallCard::BeforeClose` возникает, когда Битрикс24 пытается закрыть карточку звонка.

Закрытие может не состояться. Если автозакрытие запрещено командой [disableAutoClose](./disable-auto-close.md) или в карточке открыта форма комментария, событие все равно приходит, а карточка остается на экране еще на 65 секунд. При фактическом закрытии событие приходит второй раз, поэтому обработчик должен быть готов сработать дважды.

{% note info "" %}

Событие работает в контексте приложения, открытого в точке встраивания `CALL_CARD`. Это событие js-интерфейса, а не событие REST: подписаться на него запросом к `/rest/` нельзя.

{% endnote %}

## Что получает обработчик

В обработчик события данные не передаются.

## Параметры подписки

Обработчик регистрируют из виджета методом [BX24.placement.bindEvent](../bx24-placement-bind-event.md).

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../../data-types.md) | Имя события интерфейса.

Для данного события — `CallCard::BeforeClose` ||
|| **callback***
[`callable`](../../../data-types.md) | Функция, которую Битрикс24 вызывает при наступлении события. Аргументы в обработчик не передаются ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            BX24.placement.bindEvent('CallCard::BeforeClose', function () {
                // код обработчика
            });
        });
    });
    ```

- JS (TS)

    ```ts
    // $b24 — инициализированный экземпляр SDK, см. руководство по началу работы
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    await $b24.placement.bindEvent('CallCard::BeforeClose', () => {
      // код обработчика
    })
    ```

- JS (UMD)

    ```html
    <!-- Загрузка SDK в UMD-сборке, глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        await $b24.placement.bindEvent('CallCard::BeforeClose', () => {
          // код обработчика
        })
      })
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.placement.bind_event(
            placement='CallCard::BeforeClose',
            handler='**your_handler_url_here**',
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
                'placement.bindEvent',
                [
                    'PLACEMENT' => 'CallCard::BeforeClose',
                    'HANDLER' => '**your_handler_url_here**'
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
        'placement.bindEvent',
        {
            PLACEMENT: 'CallCard::BeforeClose',
            HANDLER: '**your_handler_url_here**'
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
        'placement.bindEvent',
        [
            'PLACEMENT' => 'CallCard::BeforeClose',
            'HANDLER' => '**your_handler_url_here**'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ошибки

Проверьте условия.

- Виджет открыт в точке встраивания `CALL_CARD`. В других точках встраивания события `CallCard::*` не зарегистрированы, и подписка молча не сработает
- Имя события передано без опечаток и с учетом регистра. Список событий, доступных в текущей точке встраивания, возвращает [BX24.placement.getInterface](../bx24-placement-get-interface.md)

## Продолжите изучение

- [{#T}](./get-status.md)
- [{#T}](./disable-auto-close.md)
- [{#T}](./enable-auto-close.md)
- [{#T}](./call-card-entity-changed.md)
- [{#T}](./call-card-call-state-changed.md)
- [{#T}](./index.md)
- [{#T}](../../telephony/call-card.md)
