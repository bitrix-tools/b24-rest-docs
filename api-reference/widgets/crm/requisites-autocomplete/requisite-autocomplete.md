# Автозаполнение реквизитов клиента в карточке CRM_REQUISITE_AUTOCOMPLETE

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../../scopes/permissions.md)

Точка `CRM_REQUISITE_AUTOCOMPLETE` подключает обработчик приложения к поиску реквизитов клиента в карточке CRM. Она нужна, когда приложение ищет и подставляет реквизиты компании или контакта из внешнего источника.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../../placement-bind.md).

Общий порядок работы описан в обзоре [Автозаполнение реквизитов в карточке CRM](./index.md).

{% note info "" %}

Обработчик не будет доступен в интерфейсе выбора источника поиска, пока установка приложения не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `CRM_REQUISITE_AUTOCOMPLETE` | Источник поиска в поле *Реквизиты* карточки компании или контакта ||
|#

### Где находится в интерфейсе

Откройте карточку компании или контакта и перейдите к полю *Реквизиты*. Обработчик подключается к поиску в этом поле.

Если источник поиска один, его название показывается подсказкой в самом поле. Если источников несколько, при вводе запроса они предлагаются списком под полем. Обработчик приложения отображается в этом списке с названием из параметра `TITLE`.

![Обработчик приложения в списке источников поиска реквизитов](./_images/CRM_REQUISITE_AUTOCOMPLETE.png "Обработчик приложения в списке источников поиска реквизитов")

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
    [PLACEMENT] => CRM_REQUISITE_AUTOCOMPLETE
    [PLACEMENT_OPTIONS] => {"searchQuery":"7712345678","URI":"\/crm\/company\/details\/2979\/?any=details%2F2979%2F&IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER"}
)
```

Строка `PLACEMENT_OPTIONS` из этого примера после разбора выглядит так:

```json
{
    "searchQuery": "7712345678",
    "URI": "/crm/company/details/2979/?any=details%2F2979%2F&IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER"
}
```

{% include notitle [описание стандартных данных](../../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова. Кроме универсального ключа `URI` в контекст попадает собственный ключ точки.

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **searchQuery***
[`string`](../../../data-types.md) | Строка, которую пользователь ввел в поле поиска реквизитов ||
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
`тип` | **Описание** ||
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
                id: 'company-123',
                name: 'ООО Ромашка',
                phone: '+7 495 000-00-00',
                email: 'info@example.com',
                web: 'https://example.com'
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
`тип` | **Описание** ||
|| **appSid**
[`string`](../../../data-types.md) | Идентификатор сессии приложения, в которой был найден выбранный вариант ||
|| **data**
[`object`](../../../data-types.md) | Данные выбранного варианта из списка, который приложение передало через `crmShowFoundEntities` ||
|#

В объекте `fields` передайте поля реквизитов, которые нужно подставить в карточку CRM. Состав объекта зависит от данных, которые приложение получило из своего источника.

```javascript
BX24.placement.bindEvent('onCrmEntityIsNeedToCreate', function (eventData) {
    const selected = eventData.data;
    const selectedTitle = selected.title || selected.name;

    BX24.placement.call(
        'crmShowCreatedEntity',
        {
            entityType: 'company',
            id: selected.id,
            title: selectedTitle,
            fields: {
                RQ_COMPANY_NAME: selectedTitle
            }
        }
    );
});
```

Поля команды `crmShowCreatedEntity`:

#|
|| **Поле**
`тип` | **Описание** ||
|| **entityType**
[`string`](../../../data-types.md) | Тип созданного объекта. Для компании передайте `company`, для контакта — `contact` ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор созданного объекта на стороне приложения ||
|| **title**
[`string`](../../../data-types.md) | Название созданного объекта ||
|| **fields**
[`object`](../../../data-types.md) | Поля реквизитов, которые нужно подставить в карточку CRM ||
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
        "PLACEMENT": "CRM_REQUISITE_AUTOCOMPLETE",
        "HANDLER": "https://your-domain.com/widgets/crm-requisite-autocomplete-handler.php",
        "TITLE": "Поиск реквизитов",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Поиск реквизитов"
          },
          "en": {
            "TITLE": "Requisite search"
          }
        },
        "OPTIONS": {
          "countries": "1,14"
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
          PLACEMENT: 'CRM_REQUISITE_AUTOCOMPLETE',
          HANDLER: 'https://your-domain.com/widgets/crm-requisite-autocomplete-handler.php',
          TITLE: 'Requisite search',
          LANG_ALL: {
            ru: {
              TITLE: 'Поиск реквизитов',
            },
            en: {
              TITLE: 'Requisite search',
            },
          },
          OPTIONS: {
            countries: '1,14',
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
      async function bindCrmRequisiteAutocomplete() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_REQUISITE_AUTOCOMPLETE',
              HANDLER: 'https://your-domain.com/widgets/crm-requisite-autocomplete-handler.php',
              TITLE: 'Requisite search',
              LANG_ALL: {
                ru: {
                  TITLE: 'Поиск реквизитов',
                },
                en: {
                  TITLE: 'Requisite search',
                },
              },
              OPTIONS: {
                countries: '1,14',
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

      document.addEventListener('DOMContentLoaded', bindCrmRequisiteAutocomplete)
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
                    'PLACEMENT' => 'CRM_REQUISITE_AUTOCOMPLETE',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-requisite-autocomplete-handler.php',
                    'TITLE' => 'Поиск реквизитов',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Поиск реквизитов',
                        ],
                        'en' => [
                            'TITLE' => 'Requisite search',
                        ],
                    ],
                    'OPTIONS' => [
                        'countries' => '1,14',
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
            PLACEMENT: 'CRM_REQUISITE_AUTOCOMPLETE',
            HANDLER: 'https://your-domain.com/widgets/crm-requisite-autocomplete-handler.php',
            TITLE: 'Поиск реквизитов',
            LANG_ALL: {
                ru: { TITLE: 'Поиск реквизитов' },
                en: { TITLE: 'Requisite search' }
            },
            OPTIONS: {
                countries: '1,14'
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
            'PLACEMENT' => 'CRM_REQUISITE_AUTOCOMPLETE',
            'HANDLER' => 'https://your-domain.com/widgets/crm-requisite-autocomplete-handler.php',
            'TITLE' => 'Поиск реквизитов',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Поиск реквизитов',
                ],
                'en' => [
                    'TITLE' => 'Requisite search',
                ],
            ],
            'OPTIONS' => [
                'countries' => '1,14',
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
    	"PLACEMENT": "CRM_REQUISITE_AUTOCOMPLETE",
    	"HANDLER":   "https://your-domain.com/widgets/crm-requisite-autocomplete-handler.php",
    	"TITLE":     "Поиск реквизитов",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Поиск реквизитов",
    		},
    		"en": b24.Params{
    			"TITLE": "Requisite search",
    		},
    	},
    	"OPTIONS": b24.Params{
    		"countries": "1,14",
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
|| Обработчик зарегистрирован, но не появляется в списке источников поиска | Завершите [установку приложения](../../../../settings/app-installation/installation-finish.md) и проверьте, что в `PLACEMENT` передан код `CRM_REQUISITE_AUTOCOMPLETE` ||
|| Обработчик недоступен для нужной страны | Проверьте значение `OPTIONS[countries]`. Строка должна содержать идентификаторы стран через запятую без пробелов ||
|| Обработчик не вызывается, пока пользователь набирает запрос | Битрикс24 вызывает внешний поиск, когда в строке поиска не меньше трех символов ||
|| Обработчик не находит строку поиска в теле запроса | `searchQuery` приходит внутри `PLACEMENT_OPTIONS` отдельной JSON-строкой, а не отдельным параметром ||
|| Найденные варианты не отображаются | Передавайте массив вариантов в поле `data` команды `crmShowFoundEntities` ||
|| После выбора вариант не подставляется в карточку | Подпишитесь на `onCrmEntityIsNeedToCreate` и после создания объекта вызовите `crmShowCreatedEntity` ||
|#

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../../placement-bind.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./bank-detail-autocomplete.md)
- [{#T}](../../placement-bind.md)
- [{#T}](../../ui-interaction/index.md)
- [{#T}](../../bx24-widget-methods.md)
- [{#T}](../../../crm/requisites/index.md)
