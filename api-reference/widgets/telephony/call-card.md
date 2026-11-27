# Вкладка в карточке звонка CALL_CARD

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, telephony`](../../scopes/permissions.md)

Виджет добавляет свою вкладку в карточку звонка. Обработчик получает контекст звонка: идентификатор звонка, номер телефона, направление и состояние звонка, связанные элементы CRM. Точку можно использовать, чтобы:

- показать оператору данные клиента из своей системы
- подсказать сценарий разговора по связанной сделке или лиду
- записать итог разговора во внешний сервис

Выберите эту точку, если оператор должен видеть данные во время звонка. Для своего отчета по звонкам используйте [{#T}](./analytics-menu.md).

Обработчик загружается, когда оператор открывает вкладку приложения. Исключение — карточка без других вкладок, например без скриптов, списка обзвона или CRM-формы. Тогда карточка сама открывает первую вкладку приложения, и обработчик загружается сразу, как только карточка открылась.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md). Метод работает только от имени приложения, через вебхук точку не зарегистрировать. Зарегистрировать виджет может администратор Битрикс24, а в локальном приложении — еще и сотрудник с правом создавать приложения.

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `CALL_CARD` | Вкладка в карточке звонка ||
|#

### Где находится в интерфейсе

Карточка звонка появляется у сотрудника, когда начинается звонок. В обзвоне она открывается еще до звонка — когда сотрудник переходит к клиенту из списка. Вкладка приложения выводится в правой части карточки, в одном ряду со встроенными вкладками.

Название вкладки задается параметром метода [placement.bind](../placement-bind.md) при регистрации.

#|
|| **Параметр**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Название вкладки в карточке звонка. Если передан `LANG_ALL`, название берется из него на языке пользователя. Если не передано ни то, ни другое, выводится название приложения ||
|#

Название переводится на язык пользователя через параметр `LANG_ALL` — как в примерах ниже.

![Вкладка в карточке звонка](./_images/CALL_CARD.png "Вкладка в карточке звонка")

Чтобы проверить виджет, нужен звонок. Внешнюю телефонию поднимают методом [telephony.externalCall.register](../../telephony/telephony-external-call-register.md) с параметром `SHOW` = 1 или методом [telephony.externalCall.show](../../telephony/telephony-external-call-show.md) для уже зарегистрированного звонка.

Список вкладок карточки собирается при загрузке страницы Битрикс24. Если вы зарегистрировали виджет, когда страница уже была открыта, перезагрузите ее — иначе новой вкладки в карточке не будет.

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 588b8a98e848778a4ffb38fbcf70f2b9
    [AUTH_ID] => 4172bb6600705a0700005a4b00000001f0f107c42ca5bd5f61030c5d9c3e4d60d11b5a
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 31f1e26600705a0700005a4b00000001f0f107b1918506d8a2ed9ecf76e8fdac962471
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => telephony,crm,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => CALL_CARD
    [PLACEMENT_OPTIONS] => {"CALL_ID":"externalCall.c3ee67f1a63f6e6117c230ab59cc49ea.1723556778","PHONE_NUMBER":"+79001234567","LINE_NUMBER":"+7 495 000-00-00","LINE_NAME":"+7 495 000-00-00","CRM_ENTITY_TYPE":"COMPANY","CRM_ENTITY_ID":"17","CRM_ACTIVITY_ID":"undefined","CRM_BINDINGS":[{"ENTITY_TYPE":"DEAL","ENTITY_ID":"25"},{"ENTITY_TYPE":"COMPANY","ENTITY_ID":"17"}],"CALL_DIRECTION":"incoming","CALL_STATE":"connected","CALL_LIST_MODE":"false","URI":"\/crm\/company\/details\/17\/"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS {#placement-options}

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом звонка.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **CALL_ID***
[`string`](../../data-types.md) | Идентификатор звонка, во время которого открыт виджет.

Этот же идентификатор возвращает метод [telephony.externalCall.register](../../telephony/telephony-external-call-register.md). Его принимают методы завершения звонка и прикрепления записи разговора.

В обзвоне до начала звонка приходит пустая строка

||
|| **PHONE_NUMBER**
[`string`](../../data-types.md) | Номер телефона клиента, с которым идет разговор.

При звонке номер приходит в нормализованном виде, без пробелов и разделителей. В обзвоне — так, как он записан в CRM, например `8 (999) 000-77-09`. Если номера нет, приходит строка `undefined` — например, в обзвоне у клиента без телефона

||
|| **LINE_NUMBER**
[`string`](../../data-types.md) | Номер телефона компании, на который поступил звонок или с которого он совершается

||
|| **LINE_NAME**
[`string`](../../data-types.md) | Название телефонной линии компании.

Линии добавляются приложениями для интеграции телефоний методом [telephony.externalLine.add](../../telephony/telephony-external-line-add.md) и используются в сквозной аналитике. Если у линии нет названия, в ключе приходит ее номер

||
|| **CRM_ENTITY_TYPE**
[`string`](../../data-types.md) | Символьный код [типа элемента CRM](../../crm/data-types.md#object_type), к которому привязан звонок: `LEAD`, `DEAL`, `CONTACT`, `COMPANY`, в обзвоне — еще `QUOTE` и `INVOICE`.

Это `entityTypeName`, а не числовой идентификатор типа. Если звонок не привязан к CRM, ключ приходит пустым

||
|| **CRM_ENTITY_ID**
[`string`](../../data-types.md) | Идентификатор элемента CRM, к которому привязан звонок.

Зная тип и идентификатор, можно получить данные элемента:

- любой тип объекта — [crm.item.get](../../crm/universal/crm-item-get.md) с указанием `entityTypeId` = '1' для лидов, '2' для сделок и [т.д.](../../crm/data-types.md#object_type)
- лид — [crm.lead.get](../../crm/leads/crm-lead-get.md)
- сделка — [crm.deal.get](../../crm/deals/crm-deal-get.md)
- контакт — [crm.contact.get](../../crm/contacts/crm-contact-get.md)
- компания — [crm.company.get](../../crm/companies/crm-company-get.md)

Если звонок не привязан к CRM, в ключе приходит `0`

||
|| **CRM_BINDINGS**
[`array`](../../data-types.md) | Все элементы CRM, связанные со звонком. Состав элемента массива [описан ниже](#crm_bindings).

Ключи `CRM_ENTITY_TYPE` и `CRM_ENTITY_ID` называют только основной элемент. Если звонок связан сразу с несколькими элементами — например, с компанией и ее сделкой, — полный список приходит в `CRM_BINDINGS`.

Если связанных элементов нет, ключ не передается. В обзвоне по контактам и компаниям его тоже нет: элемент приходит только в `CRM_ENTITY_TYPE` и `CRM_ENTITY_ID`. В обзвоне по сделкам, предложениям и счетам, у которых указан клиент, в `CRM_ENTITY_TYPE` и `CRM_ENTITY_ID` приходит клиент, а в `CRM_BINDINGS` — сама сделка, предложение или счет

||
|| **CRM_ACTIVITY_ID**
[`string`](../../data-types.md) | Идентификатор [дела CRM](../../crm/timeline/activities/index.md), созданного для этого звонка.

Данные дела возвращает метод [crm.activity.get](../../crm/timeline/activities/activity-base/crm-activity-get.md).

Если дело для звонка не создано, приходит строка `undefined`. У внешнего звонка из метода [telephony.externalCall.register](../../telephony/telephony-external-call-register.md) здесь всегда `undefined`: дело создает метод [telephony.externalCall.finish](../../telephony/telephony-external-call-finish.md) после звонка. Проверяйте значение перед использованием

||
|| **CALL_DIRECTION***
[`string`](../../data-types.md) | Направление звонка. Возможные значения:

- `incoming` — входящий звонок
- `outgoing` — исходящий звонок
- `callback` — обратный звонок

||
|| **CALL_STATE**
[`string`](../../data-types.md) | Состояние звонка в момент открытия виджета. Возможные значения:

- `idle` — разговор еще не начат
- `connecting` — идет соединение
- `connected` — активный разговор

||
|| **CALL_LIST_MODE**
[`string`](../../data-types.md) | Указывает, совершается ли звонок в рамках [обзвона](https://helpdesk.bitrix24.ru/open/17520342/). Значение приходит строкой: `true` или `false`

||
|#

Вместе с этими ключами приходит универсальный ключ `URI` — он описан выше, в стандартных данных.

#### Состав CRM_BINDINGS {#crm_bindings}

#|
|| **Ключ**
`тип` | **Описание** ||
|| **ENTITY_TYPE**
[`string`](../../data-types.md) | Символьный код [типа элемента CRM](../../crm/data-types.md#object_type): `LEAD`, `DEAL`, `CONTACT`, `COMPANY`, в обзвоне — еще `QUOTE` и `INVOICE` ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Идентификатор элемента CRM ||
|#

Точка не поддерживает параметр `OPTIONS` метода [placement.bind](../placement-bind.md): переданные значения не сохраняются, в ответе [placement.get](../placement-get.md) поле `options` такой регистрации — пустой массив.

## Управление карточкой звонка из обработчика

Обработчик может не только читать контекст, но и работать с карточкой звонка из браузера: получить данные текущего звонка, запретить и снова разрешить автоматическое закрытие карточки, отследить смену клиента и состояния звонка. Команды и события карточки описаны в разделе [{#T}](../ui-interaction/call-card/index.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "CALL_CARD",
        "HANDLER": "https://your-domain.com/widgets/call-card-handler.php",
        "TITLE": "Карточка клиента",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Карточка клиента"
          },
          "en": {
            "TITLE": "Customer profile"
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
          PLACEMENT: 'CALL_CARD',
          HANDLER: 'https://your-domain.com/widgets/call-card-handler.php',
          TITLE: 'Customer profile',
          LANG_ALL: {
            ru: {
              TITLE: 'Карточка клиента',
            },
            en: {
              TITLE: 'Customer profile',
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
      async function bindCallCard() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CALL_CARD',
              HANDLER: 'https://your-domain.com/widgets/call-card-handler.php',
              TITLE: 'Customer profile',
              LANG_ALL: {
                ru: {
                  TITLE: 'Карточка клиента',
                },
                en: {
                  TITLE: 'Customer profile',
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

      document.addEventListener('DOMContentLoaded', bindCallCard)
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
                    'PLACEMENT' => 'CALL_CARD',
                    'HANDLER' => 'https://your-domain.com/widgets/call-card-handler.php',
                    'TITLE' => 'Карточка клиента',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Карточка клиента',
                        ],
                        'en' => [
                            'TITLE' => 'Customer profile',
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
            PLACEMENT: 'CALL_CARD',
            HANDLER: 'https://your-domain.com/widgets/call-card-handler.php',
            TITLE: 'Карточка клиента',
            LANG_ALL: {
                ru: { TITLE: 'Карточка клиента' },
                en: { TITLE: 'Customer profile' }
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
            'PLACEMENT' => 'CALL_CARD',
            'HANDLER' => 'https://your-domain.com/widgets/call-card-handler.php',
            'TITLE' => 'Карточка клиента',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Карточка клиента',
                ],
                'en' => [
                    'TITLE' => 'Customer profile',
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
    	"PLACEMENT": "CALL_CARD",
    	"HANDLER":   "https://your-domain.com/widgets/call-card-handler.php",
    	"TITLE":     "Карточка клиента",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Карточка клиента",
    		},
    		"en": b24.Params{
    			"TITLE": "Customer profile",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("placement.bind: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его в структуру
    // под форму ответа из раздела «Обработка ответа» страницы placement.bind.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

Если регистрация прошла, метод вернет `result: true`. Чтобы вкладка появилась в карточке звонка, завершите установку приложения и перезагрузите страницу Битрикс24.

## Типовые ошибки

#|
|| **Ошибка** | **Как решить** ||
|| [placement.bind](../placement-bind.md) возвращает `WRONG_AUTH_TYPE` с описанием `Application context required` | Регистрируйте точку от имени приложения. Вебхуком точку не привязать ||
|| [placement.bind](../placement-bind.md) возвращает `ERROR_PLACEMENT_NOT_FOUND` | Код точки указан неверно или приложению не выдан скоуп `telephony` ||
|| [placement.bind](../placement-bind.md) возвращает `ERROR_ARGUMENT` | Передайте обязательные параметры `PLACEMENT` и `HANDLER`. Какой параметр не передан, сказано в `error_description`, например `Argument 'The URL of the placement handler is not specified' is null or empty` при пустом `HANDLER` ||
|| Виджет зарегистрирован, но вкладки в карточке звонка нет | Завершите [установку приложения](../../../settings/app-installation/installation-finish.md) и перезагрузите страницу Битрикс24: список вкладок карточки собирается при загрузке страницы ||
|| Обработчик получил не те данные звонка: нет идентификатора дела, тип элемента CRM не распознан, не хватает связанного элемента | Сверьтесь с разделом [PLACEMENT_OPTIONS](#placement-options): идентификатор дела может прийти строкой `undefined`, тип элемента приходит символьным кодом, а все связанные элементы — в `CRM_BINDINGS` ||
|#

Ошибка приходит в теле ответа — код в поле `error`, текст в `error_description`:

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../placement-bind.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./analytics-menu.md)
- [{#T}](./webrtc.md)
- [{#T}](../placement-bind.md)
- [{#T}](../../telephony/telephony-external-call-register.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)
