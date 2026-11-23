# Кнопка в шапке CRM-аналитики CRM_ANALYTICS_TOOLBAR

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Виджет добавляет пункт в меню составной кнопки в шапке CRM-аналитики.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Как работает точка

1. Приложение регистрирует обработчик методом [placement.bind](../placement-bind.md): в `PLACEMENT` передает код из [таблицы](#codes), в `HANDLER` — URL обработчика. Метод работает только от имени приложения, через вебхук точку не зарегистрировать. Зарегистрировать виджет может администратор или сотрудник с правом создавать приложения
2. В меню составной кнопки в шапке отчета CRM-аналитики появляется пункт с названием из `TITLE`. Если название не задано, используется название приложения
3. Пользователь выбирает пункт, и Битрикс24 открывает обработчик во фрейме. Обработчик получает POST-запрос с [данными вызова](#handler-data)
4. Обработчик может вызывать REST от имени текущего пользователя с токеном из `AUTH_ID`

## Когда использовать

Точка подходит, когда нужно:

- открыть настройки интеграции из CRM-аналитики
- показать связанный отчет приложения из шапки раздела

Выбирайте `CRM_ANALYTICS_TOOLBAR` для действия из шапки отчета. Чтобы добавить отчет приложения отдельным пунктом в левое меню CRM-аналитики, используйте [CRM_ANALYTICS_MENU](./analytics-menu.md).

## Куда встраивается виджет {#codes}

#|
|| **Код точки встраивания** | **Место** ||
|| `CRM_ANALYTICS_TOOLBAR` | Пункт меню составной кнопки в шапке CRM-аналитики ||
|#

### Где находится в интерфейсе

Откройте раздел *CRM-аналитика* и выберите отчет в левом меню. Справа в шапке раздела, рядом с настройками отчета, выводится составная кнопка: нажмите стрелку на ней и выберите пункт приложения. На самой кнопке показан пункт, который пользователь выбирает чаще всего, или подпись *Расширения*, — как на снимке ниже.

Кнопка есть не на каждом отчете. Например, на отчете *Индивидуальная эффективность* своих настроек нет, и в шапке остается только кнопка обратной связи.

![Кнопка в шапке CRM-аналитики](./_images/CRM_ANALYTICS_TOOLBAR.png "Кнопка в шапке CRM-аналитики")

## Что получает обработчик {#handler-data}

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 409c73573874c65b526f515837ae4775
    [AUTH_ID] => f6b37166007e9c94001e30ba00000001f0f107b14e3f62a7c95d08ef7243b16
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => e5a29966007e9c94001e30ba00000001f0f107adf7048b529ce3d61b485f027
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => CRM_ANALYTICS_TOOLBAR
    [PLACEMENT_OPTIONS] => {"URI":"\/report\/analytics\/"}
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Собственных ключей у точки нет. Общий ключ `URI` описан в стандартных данных выше.

## OPTIONS при регистрации через placement.bind

Параметры `OPTIONS` точка не поддерживает. Переданные значения не сохраняются: метод [placement.get](../placement-get.md) возвращает для такой регистрации пустой массив.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "CRM_ANALYTICS_TOOLBAR",
        "HANDLER": "https://your-domain.com/widgets/crm-analytics-toolbar-handler.php",
        "TITLE": "Мой пункт в CRM-аналитике",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой пункт в CRM-аналитике"
          },
          "en": {
            "TITLE": "My CRM analytics item"
          }
        },
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
          PLACEMENT: 'CRM_ANALYTICS_TOOLBAR',
          HANDLER: 'https://your-domain.com/widgets/crm-analytics-toolbar-handler.php',
          TITLE: 'Мой пункт в CRM-аналитике',
          LANG_ALL: {
            ru: {
              TITLE: 'Мой пункт в CRM-аналитике',
            },
            en: {
              TITLE: 'My CRM analytics item',
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
      async function bindCrmAnalyticsToolbar() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_ANALYTICS_TOOLBAR',
              HANDLER: 'https://your-domain.com/widgets/crm-analytics-toolbar-handler.php',
              TITLE: 'Мой пункт в CRM-аналитике',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мой пункт в CRM-аналитике',
                },
                en: {
                  TITLE: 'My CRM analytics item',
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
          console.info('Placement bound successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindCrmAnalyticsToolbar)
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
                    'PLACEMENT' => 'CRM_ANALYTICS_TOOLBAR',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-analytics-toolbar-handler.php',
                    'TITLE' => 'Мой пункт в CRM-аналитике',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой пункт в CRM-аналитике',
                        ],
                        'en' => [
                            'TITLE' => 'My CRM analytics item',
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
        'placement.bind',
        {
            PLACEMENT: 'CRM_ANALYTICS_TOOLBAR',
            HANDLER: 'https://your-domain.com/widgets/crm-analytics-toolbar-handler.php',
            TITLE: 'Мой пункт в CRM-аналитике',
            LANG_ALL: {
                ru: { TITLE: 'Мой пункт в CRM-аналитике' },
                en: { TITLE: 'My CRM analytics item' }
            }
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
            'PLACEMENT' => 'CRM_ANALYTICS_TOOLBAR',
            'HANDLER' => 'https://your-domain.com/widgets/crm-analytics-toolbar-handler.php',
            'TITLE' => 'Мой пункт в CRM-аналитике',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой пункт в CRM-аналитике',
                ],
                'en' => [
                    'TITLE' => 'My CRM analytics item',
                ],
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "placement.bind", b24.Params{
    	"PLACEMENT": "CRM_ANALYTICS_TOOLBAR",
    	"HANDLER":   "https://your-domain.com/widgets/crm-analytics-toolbar-handler.php",
    	"TITLE":     "Мой пункт в CRM-аналитике",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Мой пункт в CRM-аналитике",
    		},
    		"en": b24.Params{
    			"TITLE": "My CRM analytics item",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("placement.bind: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его по форме ответа
    // метода placement.bind, см. раздел «Обработка ответа» на его странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Типовые ошибки

#|
|| **Ошибка** | **Как решить** ||
|| `placement.bind` возвращает `WRONG_AUTH_TYPE` с описанием `Application context required` | Регистрируйте точку от имени приложения. Вебхуком точку не привязать ||
|| `placement.bind` возвращает `ERROR_PLACEMENT_NOT_FOUND` | Код указан неверно или приложению не выдан скоуп `crm`. Точка регистрируется только по коду `CRM_ANALYTICS_TOOLBAR` ||
|| Виджет зарегистрирован, но в интерфейсе не появляется | Завершите [установку приложения](../../../settings/app-installation/installation-finish.md) и перезагрузите страницу ||
|| Кнопка не появляется на выбранном отчете | Кнопка выводится только у отчетов со своими настройками. Проверьте виджет на другом отчете CRM-аналитики ||
|#

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../placement-bind.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./analytics-menu.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../bx24-widget-methods.md)

