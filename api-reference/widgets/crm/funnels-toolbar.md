# Кнопка в воронках и туннелях продаж CRM_FUNNELS_TOOLBAR, CRM_DYNAMIC_XXX_FUNNELS_TOOLBAR

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Виджет добавляет пункт в меню составной кнопки в окне настройки воронок и туннелей продаж [сделок](../../crm/deals/index.md) и [пользовательских типов объектов](../../crm/universal/index.md).

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Как работает точка

1. Приложение регистрирует обработчик методом [placement.bind](../placement-bind.md): в `PLACEMENT` передает код из [таблицы](#codes), в `HANDLER` — URL обработчика. Метод работает только от имени приложения, через вебхук точку не зарегистрировать. Зарегистрировать виджет может администратор или сотрудник с правом создавать приложения
2. В меню составной кнопки в шапке окна воронок и туннелей продаж появляется пункт с названием из `TITLE`. Если название не задано, используется название приложения. Пункты с одинаковым `GROUP_NAME` объединяются в подменю
3. Пользователь выбирает пункт, и Битрикс24 открывает обработчик во фрейме. Обработчик получает POST-запрос с [данными вызова](#handler-data)
4. Обработчик может вызывать REST от имени текущего пользователя с токеном из `AUTH_ID`. Тип объекта CRM определяется по коду в `PLACEMENT`: `CRM_FUNNELS_TOOLBAR` — сделки, `CRM_DYNAMIC_183_FUNNELS_TOOLBAR` — пользовательский тип с `entityTypeId` 183. Идентификатор воронки в обработчик не передается, воронки типа можно получить методом [crm.category.list](../../crm/universal/category/crm-category-list.md)

## Когда использовать

Точка подходит, когда нужно:

- открыть настройки интеграции из окна воронок и туннелей
- показать отчет приложения по воронкам

Для действий из списка объектов используйте [CRM_XXX_LIST_TOOLBAR](./list-toolbar.md), а из дизайнера роботов — [CRM_XXX_ROBOT_DESIGNER_TOOLBAR](./robot-designer-toolbar.md).

## Куда встраивается виджет {#codes}

#|
|| **Код точки встраивания** | **Место** ||
|| `CRM_FUNNELS_TOOLBAR` | Пункт меню составной кнопки в воронках и туннелях [сделок](../../crm/deals/index.md) ||
|| `CRM_DYNAMIC_XXX_FUNNELS_TOOLBAR` | Пункт меню составной кнопки в воронках и туннелях пользовательского типа объектов CRM. Вместо XXX необходимо указывать числовой идентификатор конкретного [пользовательского типа объектов](../../crm/universal/index.md). Например, `CRM_DYNAMIC_183_FUNNELS_TOOLBAR` ||
|#

### Где находится в интерфейсе

Откройте канбан объектов CRM, раскройте список воронок и выберите *Воронки и туннели продаж*. Справа в шапке окна выводится составная кнопка: нажмите стрелку на ней и выберите пункт приложения. На самой кнопке показан пункт, который пользователь выбирает чаще всего, или подпись *Расширения*. Так кнопка выглядит на снимке ниже.

Для открытия окна у пользователя должно быть хотя бы одно из прав: управление воронками, стадиями или туннелями соответствующего типа CRM. У пользовательского типа объектов окно открывается, только если в настройках типа включены воронки.

![Пункт меню составной кнопки в воронках и туннелях сделок](./_images/CRM_FUNNELS_TOOLBAR.png "Пункт меню составной кнопки в воронках и туннелях сделок")

## Что получает обработчик {#handler-data}

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

Пример показан для точки `CRM_FUNNELS_TOOLBAR`. У остальных кодов состав данных такой же: меняются значение `PLACEMENT` и путь в `URI`.

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 4048ea3ba712b0c1db2a6cc2b0e61183
    [AUTH_ID] => d4917166007e9c94001e30ba00000001f0f1078f2c1d40e95b73a6cd50218e4
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => c3809966007e9c94001e30ba00000001f0f1078bd5e26f307ac194fb2e63d05
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => CRM_FUNNELS_TOOLBAR
    [PLACEMENT_OPTIONS] => {"URI":"\/crm\/deal\/kanban\/"}
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
        "PLACEMENT": "CRM_FUNNELS_TOOLBAR",
        "HANDLER": "https://your-domain.com/widgets/crm-funnels-toolbar-handler.php",
        "TITLE": "Мой пункт в туннелях продаж",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой пункт в туннелях продаж"
          },
          "en": {
            "TITLE": "My sales tunnels item"
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
          PLACEMENT: 'CRM_FUNNELS_TOOLBAR',
          HANDLER: 'https://your-domain.com/widgets/crm-funnels-toolbar-handler.php',
          TITLE: 'Мой пункт в туннелях продаж',
          LANG_ALL: {
            ru: {
              TITLE: 'Мой пункт в туннелях продаж',
            },
            en: {
              TITLE: 'My sales tunnels item',
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
      async function bindCrmFunnelsToolbar() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_FUNNELS_TOOLBAR',
              HANDLER: 'https://your-domain.com/widgets/crm-funnels-toolbar-handler.php',
              TITLE: 'Мой пункт в туннелях продаж',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мой пункт в туннелях продаж',
                },
                en: {
                  TITLE: 'My sales tunnels item',
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

      document.addEventListener('DOMContentLoaded', bindCrmFunnelsToolbar)
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
                    'PLACEMENT' => 'CRM_FUNNELS_TOOLBAR',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-funnels-toolbar-handler.php',
                    'TITLE' => 'Мой пункт в туннелях продаж',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой пункт в туннелях продаж',
                        ],
                        'en' => [
                            'TITLE' => 'My sales tunnels item',
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
            PLACEMENT: 'CRM_FUNNELS_TOOLBAR',
            HANDLER: 'https://your-domain.com/widgets/crm-funnels-toolbar-handler.php',
            TITLE: 'Мой пункт в туннелях продаж',
            LANG_ALL: {
                ru: { TITLE: 'Мой пункт в туннелях продаж' },
                en: { TITLE: 'My sales tunnels item' }
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
            'PLACEMENT' => 'CRM_FUNNELS_TOOLBAR',
            'HANDLER' => 'https://your-domain.com/widgets/crm-funnels-toolbar-handler.php',
            'TITLE' => 'Мой пункт в туннелях продаж',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой пункт в туннелях продаж',
                ],
                'en' => [
                    'TITLE' => 'My sales tunnels item',
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
    	"PLACEMENT": "CRM_FUNNELS_TOOLBAR",
    	"HANDLER":   "https://your-domain.com/widgets/crm-funnels-toolbar-handler.php",
    	"TITLE":     "Мой пункт в туннелях продаж",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Мой пункт в туннелях продаж",
    		},
    		"en": b24.Params{
    			"TITLE": "My sales tunnels item",
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
|| `placement.bind` возвращает `ERROR_PLACEMENT_NOT_FOUND` | Сверьте код с [таблицей точек](#codes) и проверьте, выдан ли приложению scope `crm` ||
|| `placement.bind` с кодом `CRM_DEAL_FUNNELS_TOOLBAR` возвращает `ERROR_PLACEMENT_NOT_FOUND` | У сделок код точки не содержит имени объекта — используйте `CRM_FUNNELS_TOOLBAR` ||
|| Виджет зарегистрирован, но в интерфейсе не появляется | Завершите [установку приложения](../../../settings/app-installation/installation-finish.md) и перезагрузите страницу ||
|#

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../placement-bind.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./robot-designer-toolbar.md)
- [{#T}](./list-toolbar.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../bx24-widget-methods.md)

