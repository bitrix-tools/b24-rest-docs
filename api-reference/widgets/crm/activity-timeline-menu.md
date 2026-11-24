# Пункт контекстного меню записи таймлайна в карточке элемента CRM_XXX_ACTIVITY_TIMELINE_MENU, CRM_DYNAMIC_XXX_ACTIVITY_TIMELINE_MENU

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Виджет добавляет пункт в контекстное меню записи таймлайна карточки объекта CRM: [лида](../../crm/leads/index.md), [сделки](../../crm/deals/index.md), [коммерческого предложения](../../crm/quote/index.md), [нового счета](../../crm/universal/invoice.md) или [пользовательского типа объектов](../../crm/universal/index.md).

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Как работает точка

1. Приложение регистрирует обработчик методом [placement.bind](../placement-bind.md), передав код из [таблицы](#codes) в `PLACEMENT`. Метод работает только от имени приложения, через вебхук точку не зарегистрировать. Зарегистрировать виджет может администратор или сотрудник с правом создавать приложения
2. В веб-интерфейсе в подменю *Расширения* записи таймлайна появляется пункт приложения. Расширения добавляются только к записям, у которых есть контекстное меню
3. Пользователь выбирает пункт, и Битрикс24 открывает обработчик во фрейме с [данными вызова](#handler-data)
4. Обработчик может вызвать REST от имени текущего пользователя с токеном из `AUTH_ID`: например, получить объект CRM по `ENTITY_ID` или связанное дело по `ASSOCIATED_ENTITY_ID`

## Когда использовать

- открыть данные внешней системы для объекта CRM по `ENTITY_ID`
- показать подробности связанного дела, получив его через [crm.activity.get](../../crm/timeline/activities/activity-base/crm-activity-get.md), если `ASSOCIATED_ENTITY_TYPE_ID` равен `6`
- связать запись истории с записью во внешней системе по `TIMELINE_ITEM_ID`, если он передан

Для действия над карточкой в целом используйте [пункт верхнего меню](./detail-toolbar.md), а для кнопки над таймлайном — [CRM_XXX_DETAIL_ACTIVITY](./detail-activity.md).

## Куда встраивается виджет {#codes}

#|
|| **Код точки встраивания** | **Место** ||
|| `CRM_LEAD_ACTIVITY_TIMELINE_MENU` | Пункт контекстного меню записи таймлайна в [лиде](../../crm/leads/index.md) ||
|| `CRM_DEAL_ACTIVITY_TIMELINE_MENU` | Пункт контекстного меню записи таймлайна в [сделке](../../crm/deals/index.md) ||
|| `CRM_QUOTE_ACTIVITY_TIMELINE_MENU` | Пункт контекстного меню записи таймлайна в [коммерческом предложении](../../crm/quote/index.md) ||
|| `CRM_SMART_INVOICE_ACTIVITY_TIMELINE_MENU` | Пункт контекстного меню записи таймлайна в [новом счете](../../crm/universal/invoice.md). Точка доступна, если включены новые счета ||
|| `CRM_DYNAMIC_XXX_ACTIVITY_TIMELINE_MENU` | Пункт контекстного меню записи таймлайна в пользовательском типе объектов CRM. Вместо XXX необходимо указывать числовой идентификатор конкретного [пользовательского типа объектов](../../crm/universal/index.md). Например, `CRM_DYNAMIC_183_ACTIVITY_TIMELINE_MENU` ||
|#

### Где находится в интерфейсе {#interface}

Откройте карточку объекта CRM, найдите запись таймлайна с контекстным меню, нажмите *•••* в правом нижнем углу записи и наведите курсор на пункт *Расширения*. Пункт приложения выводится в этом подменю.

![Пункт контекстного меню записи таймлайна в карточке сделки](./_images/CRM_DEAL_ACTIVITY_TIMELINE_MENU.png "Пункт контекстного меню записи таймлайна в карточке сделки")

## Что получает обработчик {#handler-data}

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

Пример показан для точки `CRM_DEAL_ACTIVITY_TIMELINE_MENU` на запланированном деле.

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 4e0ec6b5f934a6af21bd9719f1d5444c
    [AUTH_ID] => b26f7166007e9c94001e30ba00000001f0f1075d0a9b2e73f14c86ad25e0b39
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => a15e9966007e9c94001e30ba00000001f0f10769b3c04d182ea75f0cb384e12
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => CRM_DEAL_ACTIVITY_TIMELINE_MENU
    [PLACEMENT_OPTIONS] => {"ENTITY_ID":"8061","ASSOCIATED_ENTITY_ID":"8097","ASSOCIATED_ENTITY_TYPE_ID":"6","URI":"\/crm\/deal\/details\/8061\/?any=details%2F8061%2F"}
)

```

`APPLICATION_SCOPE` содержит скоупы приложения из примера. Сама точка зарегистрирована в scope `crm`.

Строка `PLACEMENT_OPTIONS` из этого примера после разбора выглядит так:

```json
{
    "ENTITY_ID": "8061",
    "ASSOCIATED_ENTITY_ID": "8097",
    "ASSOCIATED_ENTITY_TYPE_ID": "6",
    "URI": "/crm/deal/details/8061/?any=details%2F8061%2F"
}
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Контекст всегда содержит идентификатор объекта CRM в `ENTITY_ID`. Состав остальных ключей зависит от записи таймлайна:

- для запланированного дела могут передаваться `ASSOCIATED_ENTITY_ID` и `ASSOCIATED_ENTITY_TYPE_ID`, как в примере выше
- для настраиваемой записи истории контекст также может содержать `TYPE_ID`, `TYPE_CATEGORY_ID` и `TIMELINE_ITEM_ID`

Проверяйте наличие ключей перед использованием. Ключи без значения в контекст не попадают.

#|
|| **Параметр** | **Описание** ||
|| **ENTITY_ID***
[`string`](../../data-types.md) | Идентификатор объекта CRM, для которого был открыт виджет.

Чтобы получить данные объекта, используйте метод [crm.item.get](../../crm/universal/crm-item-get.md), указав идентификатор объекта и его [тип](../../crm/data-types.md#object_type).

Идентификатор типа объекта отдельным ключом не приходит. Для пользовательского типа объектов его можно взять из значения параметра `PLACEMENT`: например, у кода `CRM_DYNAMIC_183_ACTIVITY_TIMELINE_MENU` идентификатор типа равен `183`

||
|| **ASSOCIATED_ENTITY_ID**
[`string`](../../data-types.md) | Идентификатор объекта, связанного с записью таймлайна. Если это дело, его можно получить методом [crm.activity.get](../../crm/timeline/activities/activity-base/crm-activity-get.md)

||
|| **ASSOCIATED_ENTITY_TYPE_ID**
[`string`](../../data-types.md) | Идентификатор [типа связанного объекта](../../crm/data-types.md#object_type). Для дела значение равно `6`

||
|| **TYPE_ID**
[`string`](../../data-types.md) | Тип записи истории в таймлайне. У запланированного дела не передается

||
|| **TYPE_CATEGORY_ID**
[`string`](../../data-types.md) | Категория записи истории в таймлайне. У запланированного дела не передается

||
|| **TIMELINE_ITEM_ID**
[`string`](../../data-types.md) | Идентификатор записи истории в таймлайне. У запланированного дела не передается

||
|#

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
        "PLACEMENT": "CRM_DEAL_ACTIVITY_TIMELINE_MENU",
        "HANDLER": "https://your-domain.com/widgets/crm-timeline-menu-handler.php",
        "TITLE": "Мой пункт меню дела",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой пункт меню дела"
          },
          "en": {
            "TITLE": "My activity menu item"
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
          PLACEMENT: 'CRM_DEAL_ACTIVITY_TIMELINE_MENU',
          HANDLER: 'https://your-domain.com/widgets/crm-timeline-menu-handler.php',
          TITLE: 'Мой пункт меню дела',
          LANG_ALL: {
            ru: {
              TITLE: 'Мой пункт меню дела',
            },
            en: {
              TITLE: 'My activity menu item',
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
      async function bindCrmDealActivityTimelineMenu() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_DEAL_ACTIVITY_TIMELINE_MENU',
              HANDLER: 'https://your-domain.com/widgets/crm-timeline-menu-handler.php',
              TITLE: 'Мой пункт меню дела',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мой пункт меню дела',
                },
                en: {
                  TITLE: 'My activity menu item',
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

      document.addEventListener('DOMContentLoaded', bindCrmDealActivityTimelineMenu)
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
                    'PLACEMENT' => 'CRM_DEAL_ACTIVITY_TIMELINE_MENU',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-timeline-menu-handler.php',
                    'TITLE' => 'Мой пункт меню дела',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой пункт меню дела',
                        ],
                        'en' => [
                            'TITLE' => 'My activity menu item',
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
            PLACEMENT: 'CRM_DEAL_ACTIVITY_TIMELINE_MENU',
            HANDLER: 'https://your-domain.com/widgets/crm-timeline-menu-handler.php',
            TITLE: 'Мой пункт меню дела',
            LANG_ALL: {
                ru: { TITLE: 'Мой пункт меню дела' },
                en: { TITLE: 'My activity menu item' }
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
            'PLACEMENT' => 'CRM_DEAL_ACTIVITY_TIMELINE_MENU',
            'HANDLER' => 'https://your-domain.com/widgets/crm-timeline-menu-handler.php',
            'TITLE' => 'Мой пункт меню дела',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой пункт меню дела',
                ],
                'en' => [
                    'TITLE' => 'My activity menu item',
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
    	"PLACEMENT": "CRM_DEAL_ACTIVITY_TIMELINE_MENU",
    	"HANDLER":   "https://your-domain.com/widgets/crm-timeline-menu-handler.php",
    	"TITLE":     "Мой пункт меню дела",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Мой пункт меню дела",
    		},
    		"en": b24.Params{
    			"TITLE": "My activity menu item",
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
|| `placement.bind` возвращает `ERROR_PLACEMENT_NOT_FOUND` | Код собран для типа объекта, который эта точка не поддерживает, или приложению не выдан скоуп `crm`. Сверьте код с таблицей в начале страницы ||
|#

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../placement-bind.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./detail-activity.md)
- [{#T}](./detail-tab.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../bx24-widget-methods.md)

