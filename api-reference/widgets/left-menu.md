# Пункт в главном меню LEFT_MENU

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../scopes/permissions.md)

Виджет добавляет пункт в главное меню Битрикс24. Пользователь выбирает пункт, и интерфейс приложения открывается отдельной страницей — на всю рабочую область, а не в слайдере.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](./placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../settings/app-installation/installation-finish.md)

{% endnote %}

## Как работает точка

1. Приложение регистрирует обработчик методом [placement.bind](./placement-bind.md) с кодом `LEFT_MENU`. Метод работает только от имени приложения, через вебхук точку не зарегистрировать. Кто может регистрировать виджеты, описано на странице метода
2. В группе *Приложения* главного меню появляется пункт приложения
3. Пользователь выбирает пункт, и Битрикс24 открывает обработчик на всю рабочую область. Обработчик получает POST-запрос с данными, которые описаны в разделе [Что получает обработчик](#handler-data)
4. Обработчик вызывает REST от имени текущего пользователя с токеном из `AUTH_ID`

## Когда использовать

Точка подходит приложению со своим разделом, который открывают из главного меню. Например:

- панель с показателями из внешней системы
- отчет по данным CRM или задач
- справочник компании

Если пункт меню может открывать основной адрес приложения, точка не нужна: [пункт приложения в главном меню](./index.md#own-page) включают в настройках приложения, без вызовов REST.

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `LEFT_MENU` | Пункт в главном меню Битрикс24 ||
|#

### Где находится в интерфейсе

Пункт приложения попадает в группу *Приложения* главного меню, вместе с пунктами других установленных приложений. Группа свернута по умолчанию — раскройте ее, чтобы увидеть пункт.

![Пункт в главном меню Битрикс24](./_images/LEFT_MENU.png "Пункт в главном меню Битрикс24")

Название пункта задается параметром `TITLE` при регистрации. Если передан `LANG_ALL`, Битрикс24 берет название из него на языке пользователя, а `TITLE` не учитывает. Если не передано ни то, ни другое, выводится название приложения.

Пункт видят только сотрудники, которым открыт доступ к приложению. Битрикс24 проверяет доступ при каждом выводе меню.

## Что получает обработчик {#handler-data}

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => fea0d7bc24669fcb8807e88ee394c7ca
    [AUTH_ID] => 63d39f6600631fcd00005a4b00000001f0f1071905299b72b307a6c223d43877697546
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 5352c76600631fcd00005a4b00000001f0f107d262f083bb53a16948269371e327d1d9
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => LEFT_MENU
    [PLACEMENT_OPTIONS] => {"URI":"\/crm\/lead\/list\/"}
)
```

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

{% include notitle [описание стандартных данных](./_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Собственных ключей у этой точки нет. В контексте вызова приходит только универсальный ключ `URI` — адрес страницы, с которой пользователь перешел по пункту меню. Меню выводится на всех страницах Битрикс24, поэтому значение `URI` зависит от страницы, с которой пользователь перешел, а не от приложения.

Точка не поддерживает параметр `OPTIONS` метода [placement.bind](./placement-bind.md): переданные значения не сохраняются, в ответе [placement.get](./placement-get.md) поле `options` этого обработчика приходит пустым массивом.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "LEFT_MENU",
        "HANDLER": "https://your-domain.com/widgets/left-menu-handler.php",
        "TITLE": "Панель поставщика",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Панель поставщика"
          },
          "en": {
            "TITLE": "Supplier dashboard"
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
          PLACEMENT: 'LEFT_MENU',
          HANDLER: 'https://your-domain.com/widgets/left-menu-handler.php',
          TITLE: 'Панель поставщика',
          LANG_ALL: {
            ru: {
              TITLE: 'Панель поставщика',
            },
            en: {
              TITLE: 'Supplier dashboard',
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // Данные доступны только при успешном ответе
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Placement bound successfully:', result)
      }
    } catch (error) {
      // Ошибки транспорта и SDK (AjaxError, SdkError и другие)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Подключение SDK (UMD-сборка), глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function bindLeftMenu() {
        try {
          // Инициализация SDK внутри фрейма Битрикс24
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'LEFT_MENU',
              HANDLER: 'https://your-domain.com/widgets/left-menu-handler.php',
              TITLE: 'Панель поставщика',
              LANG_ALL: {
                ru: {
                  TITLE: 'Панель поставщика',
                },
                en: {
                  TITLE: 'Supplier dashboard',
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // Данные доступны только при успешном ответе
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Placement bound successfully:', result)
        } catch (error) {
          // Ошибки транспорта и SDK (AjaxError, SdkError и другие)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindLeftMenu)
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
                    'PLACEMENT' => 'LEFT_MENU',
                    'HANDLER' => 'https://your-domain.com/widgets/left-menu-handler.php',
                    'TITLE' => 'Панель поставщика',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Панель поставщика',
                        ],
                        'en' => [
                            'TITLE' => 'Supplier dashboard',
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
            PLACEMENT: 'LEFT_MENU',
            HANDLER: 'https://your-domain.com/widgets/left-menu-handler.php',
            TITLE: 'Панель поставщика',
            LANG_ALL: {
                ru: {
                    TITLE: 'Панель поставщика'
                },
                en: {
                    TITLE: 'Supplier dashboard'
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
            'PLACEMENT' => 'LEFT_MENU',
            'HANDLER' => 'https://your-domain.com/widgets/left-menu-handler.php',
            'TITLE' => 'Панель поставщика',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Панель поставщика',
                ],
                'en' => [
                    'TITLE' => 'Supplier dashboard',
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
    	"PLACEMENT": "LEFT_MENU",
    	"HANDLER":   "https://your-domain.com/widgets/left-menu-handler.php",
    	"TITLE":     "Панель поставщика",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Панель поставщика",
    		},
    		"en": b24.Params{
    			"TITLE": "Supplier dashboard",
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

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./placement-bind.md)
- [{#T}](./placement-list.md)
- [{#T}](./placement-unbind.md)
- [{#T}](./universal/index.md)
- [{#T}](./ui-interaction/index.md)
- [{#T}](./bx24-widget-methods.md)
- [{#T}](../../settings/interactivity/index.md)
