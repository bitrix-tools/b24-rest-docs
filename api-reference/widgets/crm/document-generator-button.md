# Пункт выпадающего меню генератора документов CRM_XXX_DOCUMENTGENERATOR_BUTTON

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Виджет добавляет свой пункт в выпадающее меню генератора документов объекта CRM. Когда пользователь выбирает пункт приложения, открывается обработчик виджета.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Как работает точка

1. Приложение регистрирует обработчик методом [placement.bind](../placement-bind.md) с кодом из [таблицы](#codes). Метод работает только от имени приложения, через вебхук точку не зарегистрировать. Зарегистрировать виджет может администратор или сотрудник с правом создавать приложения
2. Пункт приложения появляется в подменю *Расширения* меню генератора документов в карточке объекта CRM
3. Пользователь выбирает пункт, и Битрикс24 открывает обработчик во фрейме с данными из раздела [Что получает обработчик](#handler-data)
4. Обработчик может вызывать REST от имени текущего пользователя с токеном из `AUTH_ID`: например, получать данные объекта по `ENTITY_ID`

## Когда использовать

Точка подходит приложениям, которые формируют документы по объекту своими средствами. Например:

- подготовить печатную форму по данным сделки
- открыть внешний сервис для составления договора или акта

Для действия в верхнем меню карточки используйте [CRM_XXX_DETAIL_TOOLBAR](./detail-toolbar.md), для отдельной вкладки с интерфейсом приложения — [CRM_XXX_DETAIL_TAB](./detail-tab.md).

## Куда встраивается виджет {#codes}

#|
|| **Код точки встраивания** | **Место** ||
|| `CRM_LEAD_DOCUMENTGENERATOR_BUTTON` | Пункт выпадающего меню генератора документов [лида](../../crm/leads/index.md) ||
|| `CRM_CONTACT_DOCUMENTGENERATOR_BUTTON` | Пункт выпадающего меню генератора документов [контакта](../../crm/contacts/index.md) ||
|| `CRM_COMPANY_DOCUMENTGENERATOR_BUTTON` | Пункт выпадающего меню генератора документов [компании](../../crm/companies/index.md) ||
|| `CRM_DEAL_DOCUMENTGENERATOR_BUTTON` | Пункт выпадающего меню генератора документов [сделки](../../crm/deals/index.md) ||
|| `CRM_SMART_INVOICE_DOCUMENTGENERATOR_BUTTON` | Пункт выпадающего меню генератора документов [нового счета](../../crm/universal/invoice.md) ||
|| `CRM_QUOTE_DOCUMENTGENERATOR_BUTTON` | Пункт выпадающего меню генератора документов [коммерческого предложения](../../crm/quote/index.md) ||
|| `CRM_DYNAMIC_XXX_DOCUMENTGENERATOR_BUTTON` | Пункт выпадающего меню генератора документов пользовательского типа объектов CRM. Вместо XXX необходимо указывать числовой идентификатор конкретного [пользовательского типа объектов](../../crm/universal/index.md). Например, `CRM_DYNAMIC_183_DOCUMENTGENERATOR_BUTTON` ||
|#

### Где находится в интерфейсе

Откройте карточку объекта CRM, нажмите кнопку *Документ* или *Документы* в верхней части карточки и наведите курсор на пункт *Расширения*. Пункт приложения выводится в этом подменю.

Кнопка доступна, если генератор документов включен и у пользователя есть право на просмотр документов или изменение шаблонов. В карточке смарт-процесса или нового счета также требуется сохранить элемент и включить генерацию документов для типа объекта.

![Пункт приложения в выпадающем меню генератора документов сделки](./_images/CRM_DEAL_DOCUMENTGENERATOR_BUTTON.png "Пункт приложения в выпадающем меню генератора документов сделки")

## Что получает обработчик {#handler-data}

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

Пример показан для точки `CRM_DEAL_DOCUMENTGENERATOR_BUTTON`.

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 23ab3058338edf7c4c30a52e4d0b3f94
    [AUTH_ID] => 83fd7166007e9c94001e30ba00000001f0f107a52e6ad7ef9a1b8c3d5e2f4061
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 737c9966007e9c94001e30ba00000001f0f1072b8d4e6f01a3c57d9e8b2f4160
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,documentgenerator,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => CRM_DEAL_DOCUMENTGENERATOR_BUTTON
    [PLACEMENT_OPTIONS] => {"ENTITY_ID":"8061","URI":"\/crm\/deal\/details\/8061\/?any=details%2F8061%2F"}
)

```

`APPLICATION_SCOPE` содержит скоупы приложения-примера. Для регистрации самой точки достаточно `placement` и `crm`.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Собственный ключ точки — `ENTITY_ID`.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **ENTITY_ID***
[`string`](../../data-types.md) | Идентификатор объекта CRM, для которого был открыт виджет.

По идентификатору можно получить данные объекта соответствующим методом CRM. Для [crm.item.get](../../crm/universal/crm-item-get.md) также потребуется [идентификатор типа объекта](../../crm/data-types.md#object_type).

Идентификатор типа объекта отдельным ключом не приходит. Для пользовательского типа объектов его можно взять из значения параметра `PLACEMENT`: например, у кода `CRM_DYNAMIC_183_DOCUMENTGENERATOR_BUTTON` идентификатор типа равен `183`

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
        "PLACEMENT": "CRM_DEAL_DOCUMENTGENERATOR_BUTTON",
        "HANDLER": "https://your-domain.com/widgets/crm-document-handler.php",
        "TITLE": "Договор поставки",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Договор поставки"
          },
          "en": {
            "TITLE": "Supply contract"
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
          PLACEMENT: 'CRM_DEAL_DOCUMENTGENERATOR_BUTTON',
          HANDLER: 'https://your-domain.com/widgets/crm-document-handler.php',
          TITLE: 'Договор поставки',
          LANG_ALL: {
            ru: {
              TITLE: 'Договор поставки',
            },
            en: {
              TITLE: 'Supply contract',
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
      async function bindCrmDocumentGeneratorButton() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_DEAL_DOCUMENTGENERATOR_BUTTON',
              HANDLER: 'https://your-domain.com/widgets/crm-document-handler.php',
              TITLE: 'Договор поставки',
              LANG_ALL: {
                ru: {
                  TITLE: 'Договор поставки',
                },
                en: {
                  TITLE: 'Supply contract',
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

      document.addEventListener('DOMContentLoaded', bindCrmDocumentGeneratorButton)
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
                    'PLACEMENT' => 'CRM_DEAL_DOCUMENTGENERATOR_BUTTON',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-document-handler.php',
                    'TITLE' => 'Договор поставки',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Договор поставки',
                        ],
                        'en' => [
                            'TITLE' => 'Supply contract',
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
            PLACEMENT: 'CRM_DEAL_DOCUMENTGENERATOR_BUTTON',
            HANDLER: 'https://your-domain.com/widgets/crm-document-handler.php',
            TITLE: 'Договор поставки',
            LANG_ALL: {
                ru: { TITLE: 'Договор поставки' },
                en: { TITLE: 'Supply contract' }
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
            'PLACEMENT' => 'CRM_DEAL_DOCUMENTGENERATOR_BUTTON',
            'HANDLER' => 'https://your-domain.com/widgets/crm-document-handler.php',
            'TITLE' => 'Договор поставки',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Договор поставки',
                ],
                'en' => [
                    'TITLE' => 'Supply contract',
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
    	"PLACEMENT": "CRM_DEAL_DOCUMENTGENERATOR_BUTTON",
    	"HANDLER":   "https://your-domain.com/widgets/crm-document-handler.php",
    	"TITLE":     "Договор поставки",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Договор поставки",
    		},
    		"en": b24.Params{
    			"TITLE": "Supply contract",
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
|| Виджет зарегистрирован, но в интерфейсе не появляется | Завершите [установку приложения](../../../settings/app-installation/installation-finish.md) и перезагрузите страницу ||
|| Пункт не виден в меню генератора документов | Наведите курсор на пункт *Расширения*: пункт приложения выводится в этом подменю ||
|#

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../placement-bind.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./detail-toolbar.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)
