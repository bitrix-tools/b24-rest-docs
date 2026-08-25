# Как сохранить дату оплаты в поле сделки

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «изменения» элементов объекта CRM
>
> - [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) — пользователь с правом «изменения» элементов объекта CRM
> - [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) и [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — пользователь с правом «чтения» элементов объекта CRM
> - [crm.item.payment.list](../../../api-reference/crm/universal/payment/crm-item-payment-list.md) — пользователь с правом на чтение объекта CRM, из которого выбираются оплаты

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Дату оплаты Битрикс24 хранит в документе оплаты, а не в самой сделке. В карточке сделки этой даты нет, и обычный фильтр по сделкам ее не видит. Поэтому дату оплаты часто дублируют в пользовательское поле сделки: оттуда ее забирают интеграции с внешними системами, отчеты BI-конструктора, роботы и бизнес-процессы.

Идентификатор пользовательского поля в каждом Битрикс24 свой, и записать его в код константой нельзя. Поэтому поле придется каждый раз находить по названию.

В результате сценария в поле «Дата оплаты» карточки сделки появится дата оплаты, а `crm.item.update` вернет сделку с новым значением поля.

Сценарий состоит из трех шагов.

1. Найти идентификатор поля сделки методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md)
2. Получить дату оплаты методом [crm.item.payment.list](../../../api-reference/crm/universal/payment/crm-item-payment-list.md)
3. Записать дату в поле сделки методом [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md)

## Что нужно до начала

- вебхук создан от имени пользователя, у которого есть право изменять сделки в CRM

- в правах вебхука отмечен scope `crm`

- путь вебхука дает полный доступ в рамках своего scope. Храните путь в переменной окружения и не публикуйте его в открытом коде

- в карточке сделки заранее создано пользовательское поле для даты оплаты. Его добавляют в настройках карточки сделки или методом [crm.deal.userfield.add](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md). Как выбрать тип поля, описано в блоке [Что важно учитывать](#date-type)

- известен `id` сделки, для которой переносится дата. Найти его можно в адресе карточки сделки или методом [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md)

- по этой сделке проведена хотя бы одна оплата. Если оплат нет, шаг 2 вернет пустой массив, и записывать в сделку будет нечего

Дальше в примерах используется сделка `6917` и поле с названием «Дата оплаты».

## 1. Найдем идентификатор поля сделки {#field-name}

Используем метод [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md) с параметром:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type), обязательный параметр. Укажем `2` — сделка

Метод возвращает объект `fields`: ключ — идентификатор поля, значение — его настройки. Нужное поле найдем перебором по паре признаков:

- `title` — название поля, которое видит пользователь в карточке. Ищем «Дата оплаты»

- `type` — тип поля. Проверяем, что это `date` или `datetime`: так название вроде «Дата оплаты» у строкового поля не собьет отбор

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const resultFields = await $b24.actions.v2.call.make({
        method: 'crm.item.fields',
        params: {
            entityTypeId: 2 // 2 — сделка
        },
        requestId: 'item-fields'
    });

    const fields = resultFields.getData().result.fields;
    const fieldName = Object.keys(fields).find(
        key => fields[key].title === 'Дата оплаты'
            && ['date', 'datetime'].includes(fields[key].type)
    );
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.ru",
            webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
        )
    )

    fields = client.crm.item.fields(
        2,  # 2 — сделка
    ).response.result["fields"]

    field_name = next(
        (
            key
            for key, settings in fields.items()
            if settings["title"] == "Дата оплаты" and settings["type"] in ("date", "datetime")
        ),
        None,
    )
    ```


- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    // у crm.item.fields нет обертки в SDK — вызываем метод напрямую
    $resultFields = $sb->core->call(
        'crm.item.fields',
        [ 'entityTypeId' => 2 ] // 2 — сделка
    );

    $fields = $resultFields->getResponseData()->getResult()['fields'];

    $fieldName = null;
    foreach ($fields as $key => $settings) {
        if ($settings['title'] === 'Дата оплаты' && in_array($settings['type'], ['date', 'datetime'], true)) {
            $fieldName = $key;
            break;
        }
    }
    ```
{% endlist %}

Сохраните найденный идентификатор — он нужен на шаге 3. В примере это `ufCrm_1746431727372`. Ответ сокращен до одного поля — метод возвращает весь состав полей сделки.

```json
{
    "result": {
        "fields": {
            "ufCrm_1746431727372": {
                "type": "date",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": true,
                "title": "Дата оплаты",
                "listLabel": "Дата оплаты",
                "formLabel": "Дата оплаты",
                "filterLabel": "Дата оплаты",
                "settings": {
                    "DEFAULT_VALUE": {
                        "TYPE": "NONE",
                        "VALUE": ""
                    }
                },
                "upperName": "UF_CRM_1746431727372"
            }
        }
    }
}
```

Признак `isDynamic`: `true` подтверждает, что поле пользовательское, а не системное. В `upperName` лежит то же поле в старом написании — `UF_CRM_1746431727372`. Метод [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) по умолчанию понимает только вариант из ключа, поэтому на шаге 3 передаем именно `ufCrm_1746431727372`.

## 2. Получим дату оплаты {#date}

Используем метод [crm.item.payment.list](../../../api-reference/crm/universal/payment/crm-item-payment-list.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type), обязательный параметр. Укажем `2` — сделка

- `entityId` — идентификатор сделки, для которой получаем оплаты, обязательный параметр. В примере `6917`

{% list tabs %}

- JS

    ```javascript
    const resultPayments = await $b24.actions.v2.call.make({
        method: 'crm.item.payment.list',
        params: {
            entityTypeId: 2,
            entityId: 6917
        },
        requestId: 'payment-list'
    });

    const payments = resultPayments.getData().result;
    ```

- Python

    ```python
    payments = client.crm.item.payment.list(
        entity_type_id=2,
        entity_id=6917,
    ).response.result
    ```


- PHP

    ```php
    // у crm.item.payment.list нет обертки в SDK — вызываем метод напрямую
    $resultPayments = $sb->core->call(
        'crm.item.payment.list',
        [
            'entityTypeId' => 2,
            'entityId' => 6917
        ]
    );

    $payments = $resultPayments->getResponseData()->getResult();
    ```
{% endlist %}

Метод возвращает массив оплат сделки. Дату платежа возьмите из поля `datePaid`, а по полю `paid` проверьте, что оплата действительно проведена: у неоплаченного документа `paid` равно `N`, а `datePaid` пустое.

```json
{
    "result": [
        {
            "id": 503,
            "accountNumber": "831/1",
            "paid": "Y",
            "datePaid": "2025-04-29T13:03:20+03:00",
            "empPaidId": 1,
            "paySystemId": 19,
            "sum": 15,
            "currency": "RUB",
            "paySystemName": "ЮKassa"
        }
    ]
}
```

## 3. Запишем дату в поле сделки

Используем метод [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) с параметрами:

- `entityTypeId` — `2` для сделки

- `id` — идентификатор сделки, в примере `6917`

- `fields[ufCrm_1746431727372]` — идентификатор поля из [шага 1](#field-name). Значением передаем `datePaid` из [шага 2](#date)

{% list tabs %}

- JS

    ```javascript
    const resultUpdate = await $b24.actions.v2.call.make({
        method: 'crm.item.update',
        params: {
            entityTypeId: 2,
            id: 6917,
            fields: {
                // ключ — идентификатор поля из шага 1, значение — datePaid из шага 2
                [fieldName]: payments[0].datePaid
            }
        },
        requestId: 'item-update'
    });
    ```

- Python

    ```python
    result_update = client.crm.item.update(
        2,
        6917,
        {
            # ключ — идентификатор поля из шага 1, значение — datePaid из шага 2
            field_name: payments[0]["datePaid"],
        },
    ).response.result["item"]
    ```


- PHP

    ```php
    $resultUpdate = $sb->getCRMScope()->item()->update(
        2,
        6917,
        [
            // ключ — идентификатор поля из шага 1, значение — datePaid из шага 2
            $fieldName => $payments[0]['datePaid']
        ]
    );
    ```
{% endlist %}

Метод возвращает сделку целиком уже с новым значением поля, поэтому проверять запись отдельным запросом не обязательно. Ответ сокращен до полей, которые подтверждают запись.

```json
{
    "result": {
        "item": {
            "id": 6917,
            "title": "Сделка #6531",
            "stageId": "C9:NEW",
            "opportunity": 30,
            "currencyId": "RUB",
            "updatedTime": "2026-08-20T09:14:13+03:00",
            "ufCrm_1746431727372": "2025-04-29T03:00:00+03:00"
        }
    }
}
```

{% note warning "" %}

Записали `2025-04-29T13:03:20+03:00`, а в ответе пришло `2025-04-29T03:00:00+03:00`. Это не ошибка: поле имеет тип «Дата», поэтому время не сохраняется. Время в ответе служебное и не зависит от того, что вы отправили: значения `2025-04-29`, `2025-04-29T00:00:00+03:00` и `2025-04-29T23:59:00+03:00` дадут один и тот же ответ. Сверяйте с отправленным значением только дату. Если время оплаты важно, заведите поле типа «Дата/время» — оно сохраняет значение целиком.

{% endnote %}

## Проверим результат

Откройте карточку сделки в CRM. В поле «Дата оплаты» стоит `29.04.2025` — та же дата, что и в документе оплаты.

Через REST значение поля возвращает метод [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) с параметрами:

- `entityTypeId` — `2` для сделки

- `id` — идентификатор сделки, в примере `6917`

{% list tabs %}

- JS

    ```javascript
    const checkResult = await $b24.actions.v2.call.make({
        method: 'crm.item.get',
        params: { entityTypeId: 2, id: 6917 },
        requestId: 'item-check'
    });

    console.log(checkResult.getData().result.item[fieldName]);
    ```

- Python

    ```python
    print(client.crm.item.get(2, 6917).response.result["item"][field_name])
    ```


- PHP

    ```php
    echo $sb->getCRMScope()->item()->get(2, 6917)->item()->{$fieldName};
    ```
{% endlist %}

Сценарий выполнен, если в ответе у поля `ufCrm_1746431727372` стоит дата оплаты, а не `null` и не пустая строка.

```json
{
    "result": {
        "item": {
            "id": 6917,
            "title": "Сделка #6531",
            "ufCrm_1746431727372": "2025-04-29T03:00:00+03:00"
        }
    }
}
```

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `NOT_FOUND` | Элемент не найден. Проверьте `id` сделки: она могла быть удалена или находиться в недоступной пользователю воронке ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | В `entityTypeId` передано значение, которому не соответствует ни один объект CRM. Для сделки нужно `2` ||
|| `ACCESS_DENIED` | У пользователя вебхука нет права изменять сделки. Проверьте, от чьего имени создан вебхук ||
|| `allowed_only_intranet_user` | Вебхук создан от имени внешнего пользователя. Сценарий доступен только сотрудникам Битрикс24 ||
|#

Метод [crm.item.update](../../../api-reference/crm/universal/crm-item-update.md) возвращает ошибку редко. Неизвестный идентификатор поля, недопустимое значение даты и лишние поля он отбрасывает и отвечает успехом.

Отдельно проверьте случаи, когда ответ успешный, а результат отличается от ожидаемого.

- шаг 1 не нашел поле, `fieldName` пустой — в Битрикс24 нет поля с таким названием либо у него другой тип. Сверьте название с карточкой сделки: отбор идет по точному совпадению `title`, поэтому лишний пробел или другой регистр его сломают

- шаг 2 вернул пустой массив — по сделке нет оплат либо в `entityTypeId` передан не тот тип объекта. При неверном `entityTypeId` метод не отказывает, а возвращает пустой результат

- шаг 3 отработал, но поле осталось пустым — идентификатор передан в старом написании `UF_CRM_1746431727372`. Передавайте идентификатор из шага 1 или добавьте в запрос `useOriginalUfNames`: `Y`

- в поле оказалась не та дата — в поле типа «Дата» время отбрасывается, подробности в блоке [Что важно учитывать](#date-type)

Шаги 1 и 2 ничего не меняют, их можно повторять сколько угодно раз. Если ошибку вернул шаг 3, сверьте текущее значение поля по разделу «Проверим результат», исправьте запрос и повторите только шаг 3.

## Что важно учитывать {#date-type}

- тип поля решает, сохранится ли время оплаты: «Дата» оставляет только дату, «Дата/время» — значение целиком. Выбирайте тип до того, как запустите перенос по всей базе: у заполненных полей время уже не восстановить

- параметр `useOriginalUfNames`: `Y` меняет и принимаемые, и возвращаемые идентификаторы: с ним ответ приходит с ключом `UF_CRM_1746431727372`. Читайте значение по тому идентификатору, который задает параметр, а не по тому, что отправили

- значение даты метод принимает в двух форматах: `2025-04-29T13:03:20+03:00` и `29.04.2025`

- у сделки может быть несколько оплат, и метод возвращает их все. Фрагменты шагов для краткости берут первую запись массива, а она не обязательно последняя по времени и не обязательно проведенная

- правильный отбор показан в блоке [Пример кода](#full-example): записи с `paid`: `Y`, из них максимальный `datePaid`. Если нужна первая оплата или сумма по всем, измените условие отбора

- поле сделки — это копия даты, а не связь с документом оплаты. Если оплату отменят или проведут заново, значение в сделке не обновится само. Перезапускайте сценарий по расписанию или каждый раз, когда меняете оплаты сделки

- тот же сценарий работает для других типов объектов CRM, у которых есть оплаты: поменяйте `entityTypeId` во всех трех шагах. Идентификаторы типов приведены в [справочнике типов объектов CRM](../../../api-reference/crm/data-types.md#object_type)

## Пример кода {#full-example}

Скрипт находит пользовательское поле сделки по названию, читает дату проведенной оплаты и записывает ее в это поле. Название поля и `id` сделки вынесены в переменные в начале скрипта.

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const ENTITY_TYPE_ID = 2; // 2 — сделка
    const DEAL_ID = 6917; // укажите свою сделку
    const FIELD_TITLE = 'Дата оплаты'; // название поля в карточке сделки

    async function call(method, params, requestId) {
        const result = await $b24.actions.v2.call.make({ method, params, requestId });
        if (!result.isSuccess) {
            throw new Error(result.getErrorMessages().join('; '));
        }
        return result.getData().result;
    }

    async function setPaidDate() {
        try {
            // Шаг 1: находим идентификатор поля по его названию и типу
            const { fields } = await call('crm.item.fields', {
                entityTypeId: ENTITY_TYPE_ID
            }, 'item-fields');

            const fieldName = Object.keys(fields).find(
                key => fields[key].title === FIELD_TITLE
                    && ['date', 'datetime'].includes(fields[key].type)
            );
            if (!fieldName) {
                console.error(`Поле «${FIELD_TITLE}» с типом «Дата» не найдено в карточке сделки`);
                return;
            }
            console.log('Идентификатор поля:', fieldName);

            // Шаг 2: читаем дату проведенной оплаты
            const payments = await call('crm.item.payment.list', {
                entityTypeId: ENTITY_TYPE_ID,
                entityId: DEAL_ID
            }, 'payment-list');

            const paid = payments.filter(payment => payment.paid === 'Y' && payment.datePaid);
            if (paid.length === 0) {
                console.error(`По сделке ${DEAL_ID} нет проведенных оплат`);
                return;
            }
            // берем последнюю по времени оплату, а не первую из массива
            const datePaid = paid.map(payment => payment.datePaid).sort().pop();
            console.log('Дата оплаты:', datePaid);

            // Шаг 3: записываем дату в поле сделки
            const updated = await call('crm.item.update', {
                entityTypeId: ENTITY_TYPE_ID,
                id: DEAL_ID,
                fields: { [fieldName]: datePaid }
            }, 'item-update');

            // поле типа «Дата» отбрасывает время, поэтому сверяем значение в ответе
            console.log('Записано в сделку:', updated.item[fieldName]);
        } catch (error) {
            console.error('Дата оплаты не записана:', error.message);
        }
    }

    setPaidDate();
    ```

- Python

    ```python
    # pip install b24pysdk
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.ru",
            webhook_token="USER_ID/TOKEN",  # только user_id/token, без https://
        )
    )

    ENTITY_TYPE_ID = 2  # 2 — сделка
    DEAL_ID = 6917  # укажите свою сделку
    FIELD_TITLE = "Дата оплаты"  # название поля в карточке сделки

    try:
        # Шаг 1: находим идентификатор поля по его названию и типу
        fields = client.crm.item.fields(
            ENTITY_TYPE_ID,
        ).response.result["fields"]

        field_name = next(
            (
                key
                for key, settings in fields.items()
                if settings["title"] == FIELD_TITLE and settings["type"] in ("date", "datetime")
            ),
            None,
        )

        if field_name is None:
            print(f"Поле «{FIELD_TITLE}» с типом «Дата» не найдено в карточке сделки")
        else:
            print(f"Идентификатор поля: {field_name}")

            # Шаг 2: читаем дату проведенной оплаты
            payments = client.crm.item.payment.list(
                entity_type_id=ENTITY_TYPE_ID,
                entity_id=DEAL_ID,
            ).response.result

            dates = [
                payment["datePaid"]
                for payment in payments
                if payment["paid"] == "Y" and payment["datePaid"]
            ]

            if not dates:
                print(f"По сделке {DEAL_ID} нет проведенных оплат")
            else:
                # берем последнюю по времени оплату, а не первую из массива
                date_paid = max(dates)
                print(f"Дата оплаты: {date_paid}")

                # Шаг 3: записываем дату в поле сделки
                updated = client.crm.item.update(
                    ENTITY_TYPE_ID,
                    DEAL_ID,
                    {field_name: date_paid},
                ).response.result["item"]

                # поле типа «Дата» отбрасывает время, поэтому сверяем значение в ответе
                print(f"Записано в сделку: {updated[field_name]}")
    except BitrixAPIError as error:
        print(f"Дата оплаты не записана: {error}")
    ```


- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $entityTypeId = 2; // 2 — сделка
    $dealId = 6917; // укажите свою сделку
    $fieldTitle = 'Дата оплаты'; // название поля в карточке сделки

    try {
        // Шаг 1: находим идентификатор поля по его названию и типу
        // у crm.item.fields нет обертки в SDK — вызываем метод напрямую
        $resultFields = $sb->core->call(
            'crm.item.fields',
            [ 'entityTypeId' => $entityTypeId ]
        );
        $fields = $resultFields->getResponseData()->getResult()['fields'];

        $fieldName = null;
        foreach ($fields as $key => $settings) {
            if ($settings['title'] === $fieldTitle && in_array($settings['type'], ['date', 'datetime'], true)) {
                $fieldName = $key;
                break;
            }
        }
        if ($fieldName === null) {
            echo 'Поле «' . $fieldTitle . '» с типом «Дата» не найдено в карточке сделки';
            return;
        }
        echo 'Идентификатор поля: ' . $fieldName . PHP_EOL;

        // Шаг 2: читаем дату проведенной оплаты
        // у crm.item.payment.list нет обертки в SDK — вызываем метод напрямую
        $resultPayments = $sb->core->call(
            'crm.item.payment.list',
            [
                'entityTypeId' => $entityTypeId,
                'entityId' => $dealId
            ]
        );
        $payments = $resultPayments->getResponseData()->getResult();

        $dates = [];
        foreach ($payments as $payment) {
            if ($payment['paid'] === 'Y' && !empty($payment['datePaid'])) {
                $dates[] = $payment['datePaid'];
            }
        }
        if ($dates === []) {
            echo 'По сделке ' . $dealId . ' нет проведенных оплат';
            return;
        }
        // берем последнюю по времени оплату, а не первую из массива
        sort($dates);
        $datePaid = end($dates);
        echo 'Дата оплаты: ' . $datePaid . PHP_EOL;

        // Шаг 3: записываем дату в поле сделки
        $updated = $sb->getCRMScope()->item()->update(
            $entityTypeId,
            $dealId,
            [ $fieldName => $datePaid ]
        );

        // поле типа «Дата» отбрасывает время, поэтому сверяем значение в ответе
        echo 'Записано в сделку: ' . $updated->item()->{$fieldName};
    } catch (\Throwable $e) {
        echo 'Дата оплаты не записана: ' . $e->getMessage();
    }
    ```
{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/universal/crm-item-fields.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-update.md)
- [{#T}](../../../api-reference/crm/universal/payment/crm-item-payment-list.md)
- [{#T}](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-add.md)
- [{#T}](../../../api-reference/crm/data-types.md)
- [{#T}](../../../api-reference/sale/payment/sale-payment-list.md)
