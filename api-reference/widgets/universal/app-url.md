# Открытие приложения по ссылке REST_APP_URI

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../../scopes/permissions.md)

У точки нет своей кнопки в интерфейсе. Обработчик вызывается, когда пользователь переходит по ссылке вида `/marketplace/view/#APP_CODE#/`, которую приложение само разместило в контенте: в сообщении чата, комментарии ленты, описании задачи. Приложение открывается слайдером поверх той страницы, с которой пользователь перешел.

Свои параметры можно добавить прямо в ссылку: они придут обработчику в `PLACEMENT_OPTIONS`. Так одно приложение открывает разные экраны: карточку документа, отчет, форму согласования.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `REST_APP_URI` | Слайдер, который открывается при переходе по ссылке `/marketplace/view/#APP_CODE#/` ||
|#

### Как собрать ссылку

`#APP_CODE#` — это код приложения, а не идентификатор регистрации обработчика:

- для тиражного приложения — символьный код из карточки приложения в кабинете разработчика
- для локального приложения — `client_id` из настроек приложения в разделе *Разработчикам*, например `local.66ba434d853c87.18550109`

Свои параметры передавайте в ключе `params`: `/marketplace/view/#APP_CODE#/?params[docId]=42`. Имена ключей приложение задает само, значения приходят обработчику строками.

Ссылка срабатывает везде, где Битрикс24 выводит внутренний адрес ссылкой и открывает его слайдером. Обработчик получает адрес исходной страницы в ключе `URI`, поэтому по нему видно, из какого раздела пользователь пришел.

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 9ecab44f06b9efb6c37d7b02180422b2
    [AUTH_ID] => 913374660070f28d001e30ba00000001f0f1073c8a5e2b7d94f16c0a3e58d271
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 81b29b660070f28d001e30ba00000001f0f107e4d1a9b3f508c72e6d95af3b04
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => REST_APP_URI
    [PLACEMENT_OPTIONS] => {"test":"y","docId":"42","URI":"\/company\/personal\/user\/1\/blog\/"}
)
```

Пример снят для ссылки `/marketplace/view/#APP_CODE#/?params[test]=y&params[docId]=42`, по которой перешли из ленты новостей.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка. В нее попадают ключи из `params` вашей ссылки и универсальный ключ `URI`.

#|
|| **Параметр** | **Описание** ||
|| **Ключи из `params`**
[`string`](../../data-types.md) | Значения, которые приложение задало в ссылке. Имена ключей произвольные, значения приходят строками ||
|| **URI***
[`string`](../../data-types.md) | Путь с query-строкой той страницы Битрикс24, с которой пользователь перешел по ссылке ||
|#

Ключ `URI` Битрикс24 добавляет сам, но чужое значение не перезаписывает. Если приложение передаст свой ключ `URI` в `params`, обработчик получит именно его.

## OPTIONS при регистрации через placement.bind

Точка не поддерживает параметр `OPTIONS` метода [placement.bind](../placement-bind.md): переданные значения не сохраняются, и [placement.get](../placement-get.md) возвращает пустой массив. Настройки передавайте в адресе обработчика или в ключе `params` ссылки.

Параметр `USER_ID` точка тоже не поддерживает: попытка зарегистрировать обработчик для одного пользователя возвращает ошибку `ERROR_PLACEMENT_USER_MODE`. Обработчик всегда регистрируется для всех пользователей Битрикс24.

Приложение регистрирует только один обработчик этой точки. Повторный вызов `placement.bind` возвращает ошибку `ERROR_PLACEMENT_MAX_COUNT`. Чтобы сменить адрес обработчика, сначала снимите регистрацию методом [placement.unbind](../placement-unbind.md).

### Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "REST_APP_URI",
        "HANDLER": "https://your-domain.com/widgets/app-uri-handler.php",
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/placement.bind
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
        method: 'placement.bind',
        params: {
          PLACEMENT: 'REST_APP_URI',
          HANDLER: 'https://your-domain.com/widgets/app-uri-handler.php',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Placement bound successfully:', result)
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
      async function bindAppUri() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'REST_APP_URI',
              HANDLER: 'https://your-domain.com/widgets/app-uri-handler.php',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Placement bound successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindAppUri)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.bind',
                [
                    'PLACEMENT' => 'REST_APP_URI',
                    'HANDLER' => 'https://your-domain.com/widgets/app-uri-handler.php',
                ]
            );

        $result = $response->getResponseData()->getResult();
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.bind',
        {
            PLACEMENT: 'REST_APP_URI',
            HANDLER: 'https://your-domain.com/widgets/app-uri-handler.php'
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bind',
        [
            'PLACEMENT' => 'REST_APP_URI',
            'HANDLER' => 'https://your-domain.com/widgets/app-uri-handler.php',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Связь с другими объектами

**Контент, в котором живет ссылка.** Ссылку приложение размещает теми же методами, что и любой другой текст: в сообщении чата методами раздела [{#T}](../../chats/index.md), в сообщении ленты методами раздела [{#T}](../../log/index.md), в описании задачи методами раздела [{#T}](../../tasks/index.md).

**Интерфейс приложения.** Слайдером управляют [методы JavaScript для виджетов](../bx24-widget-methods.md): `closeApplication` закрывает виджет, `openApplication` открывает его заново с другими параметрами.

## Типовые ошибки

#|
|| **Ошибка** | **Решение** ||
|| По ссылке открывается пустой слайдер | Проверьте, что приложение установлено и активно: обработчик подставляется только установленному приложению ||
|| Слайдер открывается, но параметры не приходят | Параметры передаются только в ключе `params`: `?params[docId]=42`. Ключи, переданные напрямую в query-строке, в `PLACEMENT_OPTIONS` не попадают ||
|| `placement.bind` возвращает `ERROR_PLACEMENT_MAX_COUNT` | Обработчик уже зарегистрирован. Снимите старую регистрацию методом [placement.unbind](../placement-unbind.md) ||
|| В ссылке указан идентификатор регистрации обработчика | В адресе нужен код приложения: символьный код тиражного или `client_id` локального ||
|#

{% note tip "Частые кейсы и сценарии" %}

- [Просмотр внешних документов по ссылке](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=266&LESSON_ID=25550&LESSON_PATH=25398.25506.25530.25550)

{% endnote %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./background-worker.md)
- [{#T}](../placement-bind.md)
- [{#T}](../placement-unbind.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../../../settings/interactivity/index.md)
