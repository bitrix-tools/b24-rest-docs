# Автозаполнение банковских реквизитов в карточке CRM_BANK_DETAIL_AUTOCOMPLETE

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../../scopes/permissions.md)

Точка `CRM_BANK_DETAIL_AUTOCOMPLETE` подключает обработчик приложения к поиску банковских реквизитов в карточке CRM. Она нужна, когда приложение ищет и подставляет банковские реквизиты, например по БИК.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../../placement-bind.md).

Общий порядок работы описан в обзоре [Автозаполнение реквизитов в карточке CRM](./index.md).

{% note info "" %}

Обработчик не будет доступен в интерфейсе выбора источника поиска, пока установка приложения не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `CRM_BANK_DETAIL_AUTOCOMPLETE` | Источник поиска в поле *Поиск реквизитов* блока *Банковские реквизиты* формы реквизитов ||
|#

### Где находится в интерфейсе

Чтобы дойти до поля поиска:

1. Откройте карточку компании или контакта
2. В поле *Реквизиты* нажмите *подробно*
3. В форме реквизитов добавьте банковские реквизиты

Обработчик подключается к полю *Поиск реквизитов* в блоке *Банковские реквизиты*.

Если источник поиска один, его название показывается подсказкой в самом поле. Если источников несколько, при вводе запроса они предлагаются списком под полем. Обработчик приложения отображается в этом списке с названием из параметра `TITLE`.

![Обработчик приложения в списке источников поиска банковских реквизитов](./_images/CRM_BANK_DETAIL_AUTOCOMPLETE.png "Обработчик приложения в списке источников поиска банковских реквизитов")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 8b3f2c5d9c1a4f6e9d7a2b4c6f8e1a3d
    [AUTH_ID] => 1f0f107e5806d5fe9a98e02021a72e57645f86a
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 1f0f107a80816604b24a8719792ac2a21d629b5
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => CRM_BANK_DETAIL_AUTOCOMPLETE
    [PLACEMENT_OPTIONS] => {"searchQuery":"044599999","URI":"\/bitrix\/components\/bitrix\/crm.requisite.details\/slider.ajax.php?requisite_id=n0&sessid=1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d&etype=4&eid=2979&external_context_id=COMPANY_2979&pid=1&cid=0&IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER"}
)
```

Строка `PLACEMENT_OPTIONS` из этого примера после разбора выглядит так:

```json
{
    "searchQuery": "044599999",
    "URI": "/bitrix/components/bitrix/crm.requisite.details/slider.ajax.php?requisite_id=n0&sessid=1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d&etype=4&eid=2979&external_context_id=COMPANY_2979&pid=1&cid=0&IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER"
}
```

{% include notitle [описание стандартных данных](../../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова. Кроме универсального ключа `URI` в контекст попадает собственный ключ точки. У этой точки `URI` заполняется не так, как у остальных точек CRM, поэтому он описан в таблице отдельно.

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **searchQuery***
[`string`](../../../data-types.md) | Строка, которую пользователь ввел в поле поиска банковских реквизитов ||
|| **URI***
[`string`](../../../data-types.md) | Адрес страницы, с которой открыт виджет. Форма реквизитов — отдельный документ компонента `crm.requisite.details`, поэтому здесь приходит его адрес, а не адрес карточки клиента. Идентификатор клиента передается в параметрах `eid` и `external_context_id` ||
|#

## OPTIONS при регистрации через placement.bind

Точка поддерживает параметр `OPTIONS` метода [placement.bind](../../placement-bind.md). Он ограничивает список стран, для которых работает обработчик, и не входит в данные, которые Битрикс24 передает обработчику при поиске.

#|
|| **Параметр**
`тип` | **Описание** ||
|| **countries**
[`string`](../../../data-types.md) | Идентификаторы стран через запятую без пробелов. Если параметр не передан, обработчик доступен для всех стран, для которых открыто поле поиска.

Идентификаторы стран можно получить методом [crm.requisite.preset.countries](../../../crm/requisites/presets/crm-requisite-preset-countries.md) ||
|#

## Как вернуть найденные варианты

Передайте найденные варианты командой [BX24.placement.call](../../ui-interaction/bx24-placement-call.md) с именем `crmShowFoundEntities`.

#|
|| **Поле**
[`тип`](../../../data-types.md) | **Описание** ||
|| **data**
[`array`](../../../data-types.md) | Список найденных вариантов ||
|| **data[].id**
[`string`](../../../data-types.md) | Идентификатор варианта на стороне приложения ||
|| **data[].name**
[`string`](../../../data-types.md) | Название варианта, которое будет показано пользователю ||
|| **data[].phone**
[`string`](../../../data-types.md) | Телефон варианта. Передавайте поле, если номер найден ||
|| **data[].email**
[`string`](../../../data-types.md) | E-mail варианта. Передавайте поле, если адрес найден ||
|| **data[].web**
[`string`](../../../data-types.md) | Сайт варианта. Передавайте поле, если сайт найден ||
|#

```javascript
BX24.placement.call(
    'crmShowFoundEntities',
    {
        data: [
            {
                id: 'bank-044525225',
                name: 'АО Банк Пример',
                phone: '+7 495 000-00-00',
                web: 'https://bank.example.com'
            }
        ]
    }
);
```

## Как подставить выбранный вариант в карточку

Если пользователь выбрал вариант из ответа приложения, Битрикс24 вызывает событие интерфейса `onCrmEntityIsNeedToCreate`. Подпишитесь на него методом [BX24.placement.bindEvent](../../ui-interaction/bx24-placement-bind-event.md).

В обработчик события `onCrmEntityIsNeedToCreate` передаются данные выбранного варианта.

#|
|| **Поле**
[`тип`](../../../data-types.md) | **Описание** ||
|| **appSid**
[`string`](../../../data-types.md) | Идентификатор сессии приложения, в которой был найден выбранный вариант ||
|| **data**
[`object`](../../../data-types.md) | Данные выбранного варианта из списка, который приложение передало через `crmShowFoundEntities` ||
|#

В объекте `fields` передайте поля банковских реквизитов, которые нужно подставить в карточку CRM.

```javascript
BX24.placement.bindEvent('onCrmEntityIsNeedToCreate', function (eventData) {
    const selected = eventData.data;
    const selectedTitle = selected.title || selected.name;

    BX24.placement.call(
        'crmShowCreatedEntity',
        {
            entityType: 'bank',
            id: selected.id,
            title: selectedTitle,
            fields: {
                NAME: selectedTitle,
                RQ_BANK_NAME: selectedTitle,
                RQ_BIK: '044525225',
                RQ_BANK_ADDR: 'г. Москва',
                RQ_COR_ACC_NUM: '30101810400000000225',
                RQ_SWIFT: 'EXAMPLERU'
            }
        }
    );
});
```

Поля команды `crmShowCreatedEntity`:

#|
|| **Поле**
[`тип`](../../../data-types.md) | **Описание** ||
|| **entityType**
[`string`](../../../data-types.md) | Тип созданного варианта на стороне приложения ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор созданного варианта на стороне приложения ||
|| **title**
[`string`](../../../data-types.md) | Название созданного варианта ||
|| **fields**
[`object`](../../../data-types.md) | Поля банковских реквизитов, которые нужно подставить в карточку CRM ||
|#

Поля банковских реквизитов:

#|
|| **Поле**
[`тип`](../../../data-types.md) | **Описание** ||
|| **NAME**
[`string`](../../../data-types.md) | Название банка ||
|| **RQ_BANK_NAME**
[`string`](../../../data-types.md) | Название банка в банковских реквизитах ||
|| **RQ_BIK**
[`string`](../../../data-types.md) | БИК банка ||
|| **RQ_BANK_ADDR**
[`string`](../../../data-types.md) | Адрес банка ||
|| **RQ_COR_ACC_NUM**
[`string`](../../../data-types.md) | Корреспондентский счет ||
|| **RQ_SWIFT**
[`string`](../../../data-types.md) | SWIFT ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "CRM_BANK_DETAIL_AUTOCOMPLETE",
        "HANDLER": "https://your-domain.com/widgets/crm-bank-detail-autocomplete-handler.php",
        "TITLE": "Поиск банковских реквизитов",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Поиск банковских реквизитов"
          },
          "en": {
            "TITLE": "Bank detail search"
          }
        },
        "OPTIONS": {
          "countries": "1"
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
          PLACEMENT: 'CRM_BANK_DETAIL_AUTOCOMPLETE',
          HANDLER: 'https://your-domain.com/widgets/crm-bank-detail-autocomplete-handler.php',
          TITLE: 'Bank detail search',
          LANG_ALL: {
            ru: {
              TITLE: 'Поиск банковских реквизитов',
            },
            en: {
              TITLE: 'Bank detail search',
            },
          },
          OPTIONS: {
            countries: '1',
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
      async function bindCrmBankDetailAutocomplete() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_BANK_DETAIL_AUTOCOMPLETE',
              HANDLER: 'https://your-domain.com/widgets/crm-bank-detail-autocomplete-handler.php',
              TITLE: 'Bank detail search',
              LANG_ALL: {
                ru: {
                  TITLE: 'Поиск банковских реквизитов',
                },
                en: {
                  TITLE: 'Bank detail search',
                },
              },
              OPTIONS: {
                countries: '1',
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

      document.addEventListener('DOMContentLoaded', bindCrmBankDetailAutocomplete)
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
                    'PLACEMENT' => 'CRM_BANK_DETAIL_AUTOCOMPLETE',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-bank-detail-autocomplete-handler.php',
                    'TITLE' => 'Поиск банковских реквизитов',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Поиск банковских реквизитов',
                        ],
                        'en' => [
                            'TITLE' => 'Bank detail search',
                        ],
                    ],
                    'OPTIONS' => [
                        'countries' => '1',
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
            PLACEMENT: 'CRM_BANK_DETAIL_AUTOCOMPLETE',
            HANDLER: 'https://your-domain.com/widgets/crm-bank-detail-autocomplete-handler.php',
            TITLE: 'Поиск банковских реквизитов',
            LANG_ALL: {
                ru: { TITLE: 'Поиск банковских реквизитов' },
                en: { TITLE: 'Bank detail search' }
            },
            OPTIONS: {
                countries: '1'
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
            'PLACEMENT' => 'CRM_BANK_DETAIL_AUTOCOMPLETE',
            'HANDLER' => 'https://your-domain.com/widgets/crm-bank-detail-autocomplete-handler.php',
            'TITLE' => 'Поиск банковских реквизитов',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Поиск банковских реквизитов',
                ],
                'en' => [
                    'TITLE' => 'Bank detail search',
                ],
            ],
            'OPTIONS' => [
                'countries' => '1',
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
    	"PLACEMENT": "CRM_BANK_DETAIL_AUTOCOMPLETE",
    	"HANDLER":   "https://your-domain.com/widgets/crm-bank-detail-autocomplete-handler.php",
    	"TITLE":     "Поиск банковских реквизитов",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Поиск банковских реквизитов",
    		},
    		"en": b24.Params{
    			"TITLE": "Bank detail search",
    		},
    	},
    	"OPTIONS": b24.Params{
    		"countries": "1",
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
|| Обработчик зарегистрирован, но не появляется в списке источников поиска | Завершите [установку приложения](../../../../settings/app-installation/installation-finish.md) и проверьте, что в `PLACEMENT` передан код `CRM_BANK_DETAIL_AUTOCOMPLETE` ||
|| Обработчик недоступен для нужной страны | Проверьте значение `OPTIONS[countries]`. Строка должна содержать идентификаторы стран через запятую без пробелов ||
|| Обработчик не вызывается, пока пользователь набирает запрос | Битрикс24 вызывает внешний поиск, когда в строке поиска не меньше трех символов ||
|| Обработчик не находит строку поиска в теле запроса | `searchQuery` приходит внутри `PLACEMENT_OPTIONS` отдельной JSON-строкой, а не отдельным параметром ||
|| В ключе `URI` приходит не адрес карточки клиента | Форма реквизитов — отдельный документ компонента `crm.requisite.details`. Идентификатор клиента берите из параметров `eid` и `external_context_id` ||
|| Найденные варианты не отображаются | Передавайте массив вариантов в поле `data` команды `crmShowFoundEntities` ||
|| После выбора вариант не подставляется в карточку | Подпишитесь на `onCrmEntityIsNeedToCreate` и после создания объекта вызовите `crmShowCreatedEntity` ||
|#

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../../placement-bind.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./requisite-autocomplete.md)
- [{#T}](../../placement-bind.md)
- [{#T}](../../ui-interaction/index.md)
- [{#T}](../../bx24-widget-methods.md)
- [{#T}](../../../crm/requisites/bank-detail/index.md)
