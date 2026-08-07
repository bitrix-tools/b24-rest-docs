# Пункт меню в аналитике звонков TELEPHONY_ANALYTICS_MENU

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, telephony`](../../scopes/permissions.md)

Виджет добавляет свой отчет в меню аналитики звонков. Пользователь выбирает пункт в меню, и вместо встроенного отчета открывается интерфейс приложения.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `TELEPHONY_ANALYTICS_MENU` | Пункт меню в аналитике звонков ||
|#

### Где находится в интерфейсе

Откройте раздел *Телефония* и перейдите на вкладку *Статистика звонков* — адрес страницы `/report/telephony/`. Статистика открывается в слайдере. Пункт приложения выводится в меню слева, отдельной группой под встроенными отчетами.

![Пункт меню в аналитике звонков](./_images/TELEPHONY_ANALYTICS_MENU.png "Пункт меню в аналитике звонков")

Название пункта и название группы задаются при регистрации:

- `TITLE` — название пункта в меню. Если параметр не передан, вместо него выводится название приложения
- `GROUP_NAME` — название группы, в которой будет пункт. Если параметр не передан, пункт попадает в группу *Приложения*. Пункты нескольких приложений с одинаковым `GROUP_NAME` собираются в одну группу

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => b308bae53869a142613f8852c1bd3992
    [AUTH_ID] => 4f77bb6600705a0700005a4b00000001f0f107cbd329fa1d8ea5455dc22653d12e7d54
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 3ff6e26600705a0700005a4b00000001f0f10746f1299672a11fa3729c3ba98ebd86d2
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => telephony,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => TELEPHONY_ANALYTICS_MENU
    [PLACEMENT_OPTIONS] => {"URI":"\/report\/telephony\/?IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Собственных ключей у этой точки нет. В контексте вызова приходит только универсальный ключ `URI` — адрес страницы аналитики, с которой открыт виджет. Аналитика открывается в слайдере, поэтому в адресе есть параметры `IFRAME` и `IFRAME_TYPE`.

Точка не поддерживает параметр `OPTIONS` метода [placement.bind](../placement-bind.md): переданные значения не сохраняются, [placement.get](../placement-get.md) возвращает пустой массив.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "TELEPHONY_ANALYTICS_MENU",
        "HANDLER": "https://your-domain.com/widgets/telephony-analytics-handler.php",
        "TITLE": "Отчет по внешней телефонии",
        "GROUP_NAME": "Моя телефония",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Отчет по внешней телефонии",
            "GROUP_NAME": "Моя телефония"
          },
          "en": {
            "TITLE": "External telephony report",
            "GROUP_NAME": "My telephony"
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
          PLACEMENT: 'TELEPHONY_ANALYTICS_MENU',
          HANDLER: 'https://your-domain.com/widgets/telephony-analytics-handler.php',
          TITLE: 'External telephony report',
          GROUP_NAME: 'My telephony',
          LANG_ALL: {
            ru: {
              TITLE: 'Отчет по внешней телефонии',
              GROUP_NAME: 'Моя телефония',
            },
            en: {
              TITLE: 'External telephony report',
              GROUP_NAME: 'My telephony',
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
      async function bindTelephonyAnalyticsMenu() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'TELEPHONY_ANALYTICS_MENU',
              HANDLER: 'https://your-domain.com/widgets/telephony-analytics-handler.php',
              TITLE: 'External telephony report',
              GROUP_NAME: 'My telephony',
              LANG_ALL: {
                ru: {
                  TITLE: 'Отчет по внешней телефонии',
                  GROUP_NAME: 'Моя телефония',
                },
                en: {
                  TITLE: 'External telephony report',
                  GROUP_NAME: 'My telephony',
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

      document.addEventListener('DOMContentLoaded', bindTelephonyAnalyticsMenu)
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
                    'PLACEMENT' => 'TELEPHONY_ANALYTICS_MENU',
                    'HANDLER' => 'https://your-domain.com/widgets/telephony-analytics-handler.php',
                    'TITLE' => 'Отчет по внешней телефонии',
                    'GROUP_NAME' => 'Моя телефония',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Отчет по внешней телефонии',
                            'GROUP_NAME' => 'Моя телефония',
                        ],
                        'en' => [
                            'TITLE' => 'External telephony report',
                            'GROUP_NAME' => 'My telephony',
                        ],
                    ],
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
            PLACEMENT: 'TELEPHONY_ANALYTICS_MENU',
            HANDLER: 'https://your-domain.com/widgets/telephony-analytics-handler.php',
            TITLE: 'Отчет по внешней телефонии',
            GROUP_NAME: 'Моя телефония',
            LANG_ALL: {
                ru: {
                    TITLE: 'Отчет по внешней телефонии',
                    GROUP_NAME: 'Моя телефония'
                },
                en: {
                    TITLE: 'External telephony report',
                    GROUP_NAME: 'My telephony'
                }
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
            'PLACEMENT' => 'TELEPHONY_ANALYTICS_MENU',
            'HANDLER' => 'https://your-domain.com/widgets/telephony-analytics-handler.php',
            'TITLE' => 'Отчет по внешней телефонии',
            'GROUP_NAME' => 'Моя телефония',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Отчет по внешней телефонии',
                    'GROUP_NAME' => 'Моя телефония',
                ],
                'en' => [
                    'TITLE' => 'External telephony report',
                    'GROUP_NAME' => 'My telephony',
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
    	"PLACEMENT":  "TELEPHONY_ANALYTICS_MENU",
    	"HANDLER":    "https://your-domain.com/widgets/telephony-analytics-handler.php",
    	"TITLE":      "Отчет по внешней телефонии",
    	"GROUP_NAME": "Моя телефония",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE":      "Отчет по внешней телефонии",
    			"GROUP_NAME": "Моя телефония",
    		},
    		"en": b24.Params{
    			"TITLE":      "External telephony report",
    			"GROUP_NAME": "My telephony",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("placement.bind: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./call-card.md)
- [{#T}](./webrtc.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)
