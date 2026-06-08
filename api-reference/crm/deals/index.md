# Сделки в CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сделка — один из ключевых объектов CRM, в ней:

* можно управлять процессом продажи товара или услуги, включая отслеживание этапов и прием онлайн-платежей
* ведется диалог с клиентом: звонки, письма, чаты открытых линий 
* вы можете просмотреть историю работы: дела, записи таймлайна

> Быстрый переход: [все методы и события](#all-methods) 
> 
> Пользовательская документация: [сделки в Битрикс24](https://helpdesk.bitrix24.ru/open/5493461/) 

## Связь сделок  с другими объектами CRM

**Клиент.** Поле в карточке сделки, состоящее из связанных с ней компании и контактов. Все дела звонков, писем, чатов с контактом или компанией будут сохранены в карточке активной сделки. Компания в поле одна, обращение к ней происходит напрямую через поле сделки `COMPANY_ID`. Контактов может быть указано несколько, взаимодействие с ними ведется через отдельную группу методов [crm.deal.contact.*](./contacts/index.md).

**Товары.** Добавление, изменение, удаление товарных позиций в сделках возможно через группу методов [crm.item.productrow.*](../universal/product-rows/index.md).

**Оплаты.** Добавление, изменение, удаление документов оплаты в сделках возможно через группу методов [crm.item.payment.*](../universal/payment/index.md).  

{% note tip "Пользовательская документация" %}

- [Связь между сделками, контактами и компаниями](https://helpdesk.bitrix24.ru/open/2501159/)
- [Как добавить товары в сделки, лиды и предложения](https://helpdesk.bitrix24.ru/open/13216242/)
- [Как принимать оплату от клиентов и работать с чеками в Битрикс24](https://helpdesk.bitrix24.ru/open/18225080/)

{% endnote %}

## Воронки и стадии сделок

Для сделок можно создавать различные воронки продаж и управлять ими через группу методов [crm.category.*](../universal/category/index.md) `entityTypeId` сделки = `2`.

В каждой воронке будут свои стадии. Ими можно управлять  через группу методов справочников CRM — [crm.status.*](../status/index.md). `ENTITY_ID` статусов сделок оригинальный у каждого направления — `DEAL_STAGE_xx`. 

Получить историю движения сделки по стадиям можно через метод [crm.stagehistory.list](../crm-stage-history-list.md). 

{% note tip "Пользовательская документация" %}

- [Воронки продаж: как в CRM разделить работу по отделам](https://helpdesk.bitrix24.ru/open/20732764/)

{% endnote %}

### Как изменить воронку сделки

Метод [crm.deal.update](./crm-deal-update.md) может изменить только стадию сделки внутри текущей воронки. Если передать `STAGE_ID`, который не принадлежит текущей воронке, ничего не изменится. 

Чтобы переместить сделку на стадию в другую воронку, используйте метод [crm.item.update](../universal/crm-item-update.md) с параметрами:

- `entityTypeId` — `2` для сделки,
- `id` — `id` сделки, которую перемещаете,
- `categoryId` — `id` воронки, куда перемещаете сделку. Получить можно методом [crm.category.list](../universal/category/crm-category-list.md)
- `stageId` — `id` стадии в новой воронке. Получить можно методом [crm.status.list](../status/crm-status-list.md)

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"id":233,"fields":{"STAGE_ID":"EXECUTING","categoryId":0}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"id":233,"fields":{"STAGE_ID":"EXECUTING","categoryId":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // crm.item.update (rest-v2) returns the updated element under `item`; fields per
    // ../universal/crm-item-update.md
    // Shape of the payload returned in result (the `item` object below)
    type CrmItemUpdateResult = {
      item: {
        id: number
        entityTypeId: number
        title: string
        categoryId: number
        stageId: string
        assignedById: number
        opened: string
        opportunity: number
        currencyId: string
        createdTime: ISODate
        updatedTime: ISODate
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmItemUpdateResult>({
        method: 'crm.item.update',
        params: {
          entityTypeId: 2,
          id: 233,
          fields: {
            STAGE_ID: 'EXECUTING',
            categoryId: 0,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated item:', result.item.id, result.item.stageId)
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
      async function updateDealStage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.item.update',
            params: {
              entityTypeId: 2,
              id: 233,
              fields: {
                STAGE_ID: 'EXECUTING',
                categoryId: 0,
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
          console.info('Updated item:', result.item.id, result.item.stageId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateDealStage)
    </script>
    ```

- PHP

    ```php  
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.item.update',
                [
                    'entityTypeId' => 2,
                    'id' => 233,
                    'fields' => [
                        'STAGE_ID' => 'EXECUTING',
                        'categoryId' => 0
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating item: ' . $e->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.item.update(
            bitrix_id=233,
            fields={
                "STAGE_ID": "EXECUTING",
                "categoryId": 0,
            },
            entity_type_id=2,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.item.update",
        {
            entityTypeId: 2,
            id: 233,
            fields:
            {
                "STAGE_ID": "EXECUTING",
                "categoryId": 0
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        }
    );
    ```	

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.update',
        [
            'entityTypeId' => 2,
            'id' => 233,
            'fields' => [
                'STAGE_ID' => 'EXECUTING',
                'categoryId' => 0
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Карточка сделки

Основное рабочее пространство в сделке — это вкладка Общее ее карточки. Она состоит из двух частей:

* левая, в ней располагаются поля с информацией. Если системных полей недостаточно, вы можете создать собственные пользовательские поля. Они позволяют хранить информацию в различных форматах данных: строка, число, ссылка, адрес и другие . Для создания, изменения, получения или удаления пользовательских полей сделок используется группа методов [crm.deal.userfield.*](./user-defined-fields/index.md)

* правая, в ней располагается таймлайн сделки. В нем можно создавать, редактировать, фильтровать, удалять дела CRM — группа методов [crm.activity.*](../timeline/activities/index.md), и записи таймлайна — группа методов [crm.timeline.*](../timeline/index.md)

Параметрами карточки сделки можно управлять в зависимости от воронки через группу методов [crm.deal.details.configuration.*](./custom-form/index.md).

{% note tip "Пользовательская документация" %}

- [Карточка CRM: возможности и настройки](https://helpdesk.bitrix24.ru/open/22804914/)
- [Системные поля в CRM](https://helpdesk.bitrix24.ru/open/18478840/)
- [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)
- [Таймлайн в элементе CRM](https://helpdesk.bitrix24.ru/open/23960160/)

{% endnote %}

## Виджеты

В карточку сделки можно встроить приложение. Благодаря встраиванию можно будет использовать  приложение и не покидать карточку сделки.

Есть два сценария встройки:

* Использовать специальные [места встраивания](../../widgets/crm/index.md). Например, через создание своей вкладки
* Создать [пользовательское поле](../../../tutorials/crm/crm-widgets/widget-as-field-in-lead-page.md), в которое будет загружается интерфейс вашего приложения

{% note tip "Частые кейсы и сценарии" %}

- [Механизм встройки виджетов](../../widgets/index.md)
- [Встроить виджет в карточку CRM](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Регулярные сделки

Автоматическое создание однотипных [регулярных сделок](https://helpdesk.bitrix24.ru/open/18453980/) по шаблонам. Для управлениям шаблонами используется группа методов [crm.deal.recurring.*](./recurring-deals/index.md).

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: в зависимости от метода

### Основные

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.deal.add](./crm-deal-add.md) | Создает новую сделку ||
    || [crm.deal.update](./crm-deal-update.md) | Изменяет сделку ||
    || [crm.deal.get](./crm-deal-get.md) | Возвращает сделку по идентификатору ||
    || [crm.deal.list](./crm-deal-list.md) | Возвращает список сделок по фильтру ||
    || [crm.deal.delete](./crm-deal-delete.md) | Удаляет сделку и все связанные с ней объекты ||
    || [crm.deal.fields](./crm-deal-fields.md) | Возвращает описание полей сделки ||
    || [crm.deal.productrows.set](./crm-deal-productrows-set.md) | Добавляет товары в сделку ||
    || [crm.deal.productrows.get](./crm-deal-productrows-get.md) | Возвращает товары сделки ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmDealAdd](./events/on-crm-deal-add.md) | При создании сделки ||
    || [onCrmDealUpdate](./events/on-crm-deal-update.md) | При изменении сделки ||
    || [onCrmDealDelete](./events/on-crm-deal-delete.md) | При удалении сделки ||
    || [onCrmDealMoveToCategory](./events/on-crm-deal-move-to-category.md) | При изменении воронки сделки ||
    |#

{% endlist %}
  
### Регулярные сделки

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.deal.recurring.add](./recurring-deals/crm-deal-recurring-add.md) | Создает новую регулярную сделку ||
    || [crm.deal.recurring.fields](./recurring-deals/crm-deal-recurring-fields.md) | Возвращает список полей шаблона регулярной сделки ||
    || [crm.deal.recurring.expose](./recurring-deals/crm-deal-recurring-expose.md) | Создает новую сделку из шаблона ||
    || [crm.deal.recurring.update](./recurring-deals/crm-deal-recurring-update.md) | Изменяет существующие настройки для шаблона регулярной сделки ||
    || [crm.deal.recurring.get](./recurring-deals/crm-deal-recurring-get.md) | Получает поля настройки шаблона регулярной сделки по Id ||
    || [crm.deal.recurring.list](./recurring-deals/crm-deal-recurring-list.md) | Получает список настроек шаблонов регулярных сделок ||
    || [crm.deal.recurring.delete](./recurring-deals/crm-deal-recurring-delete.md) | Удаляет существующие настройки для шаблона регулярной сделки ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmDealRecurringAdd](./recurring-deals/events/on-crm-deal-recurring-add.md) | При создании новой регулярной сделки ||
    || [onCrmDealRecurringUpdate](./recurring-deals/events/on-crm-deal-recurring-update.md) | При изменении регулярной сделки ||
    || [onCrmDealRecurringDelete](./recurring-deals/events/on-crm-deal-recurring-delete.md) | При удалении регулярной сделки ||
    || [onCrmDealRecurringExpose](./recurring-deals/events/on-crm-deal-recurring-expose.md) | При создании новой сделки из регулярной сделки ||
    |#

{% endlist %}

### Пользовательские поля

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.deal.userfield.add](./user-defined-fields/crm-deal-userfield-add.md) | Создает новое пользовательское поле для сделок ||
    || [crm.deal.userfield.update](./user-defined-fields/crm-deal-userfield-update.md) | Изменяет существующее пользовательское поле сделок ||
    || [crm.deal.userfield.get](./user-defined-fields/crm-deal-userfield-get.md) | Получает пользовательское поле сделок по Id ||
    || [crm.deal.userfield.list](./user-defined-fields/crm-deal-userfield-list.md) | Получает списка пользовательских полей сделок ||
    || [crm.deal.userfield.delete](./user-defined-fields/crm-deal-userfield-delete.md) | Удаляет пользовательское поле сделок ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmDealUserFieldAdd](./user-defined-fields/events/on-crm-deal-user-field-add.md) | При добавлении пользовательского поля ||
    || [onCrmDealUserFieldUpdate](./user-defined-fields/events/on-crm-deal-user-field-update.md) | При изменении пользовательского поля ||
    || [onCrmDealUserFieldDelete](./user-defined-fields/events/on-crm-deal-user-field-delete.md) | При удалении пользовательского поля ||
    || [onCrmDealUserFieldSetEnumValues](./user-defined-fields/events/on-crm-deal-user-field-set-enum-values.md) | При изменении набора значений для пользовательского поля списочного типа ||
    |#

{% endlist %}

### Контакты сделки

#|
|| **Метод** | **Описание** ||
|| [crm.deal.contact.add](./contacts/crm-deal-contact-add.md) | Добавляет контакт к сделке ||
|| [crm.deal.contact.items.set](./contacts/crm-deal-contact-items-set.md) | Добавляет несколько контактов к сделке ||
|| [crm.deal.contact.fields](./contacts/crm-deal-contact-fields.md) | Возвращает поля связи сделка-контакт ||
|| [crm.deal.contact.items.get](./contacts/crm-deal-contact-items-get.md) | Получает набор контактов, связанных со сделкой ||
|| [crm.deal.contact.delete](./contacts/crm-deal-contact-delete.md) | Удаляет контакт из указанной сделки ||
|| [crm.deal.contact.items.delete](./contacts/crm-deal-contact-items-delete.md) | Удаляет набор контактов, связанных с указанной сделкой ||
|#

### Управление карточками сделок

#|
|| **Метод** | **Описание** ||
|| [crm.deal.details.configuration.get](./custom-form/crm-deal-details-configuration-get.md) | Получает настройки карточки сделок ||
|| [crm.deal.details.configuration.reset](./custom-form/crm-deal-details-configuration-reset.md) | Сбрасывает настроек карточки сделок ||
|| [crm.deal.details.configuration.set](./custom-form/crm-deal-details-configuration-set.md) | Позволяет установить настройки карточки сделок ||
|| [crm.deal.details.configuration.forceCommonScopeForAll](./custom-form/crm-deal-details-configuration-force-common-scope-for-all.md) | Принудительно устанавливает общую карточку сделок для всех пользователей ||
|#
