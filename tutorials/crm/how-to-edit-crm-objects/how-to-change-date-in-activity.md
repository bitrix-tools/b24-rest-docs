# Как перенести запланированное дело на другую дату

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — право на редактирование элемента CRM, для которого обновляется дело
>
> - [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) — любой пользователь, метод возвращает данные с учетом его прав
> - [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md) — пользователь с правом на редактирование элемента CRM, для которого обновляется дело

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Запланированное дело помогает ответственному сотруднику не пропустить следующий шаг по клиенту: позвонить, написать письмо или подготовить документы. Если срок изменился, нужно обновить крайний срок дела в таймлайне CRM.

Например, перенесем запланированное дело на завтра: дату крайнего срока изменим, а время оставим таким же. Также укажем название и добавим напоминания за 15 минут до срока и в момент наступления срока.

Для переноса дела используем метод [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md). В него нужно передать идентификатор дела и элемент CRM, к которому дело привязано.

Проверяемый результат: у незакрытого универсального дела в таймлайне сделки изменится крайний срок, а метод обновления вернет идентификатор этого дела.

Сценарий состоит из двух шагов.

1. Найти незакрытое универсальное дело методом [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)
2. Передать идентификаторы и текущий срок дела в метод [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md), чтобы рассчитать и сохранить новый срок

## Что нужно до начала

- Сделка с незакрытым универсальным делом, у которого `PROVIDER_ID` равен `CRM_TODO`
- Идентификатор сделки, например `18`. Он указан в адресе карточки сделки и возвращается методами [crm.deal.list](../../../api-reference/crm/deals/crm-deal-list.md) и [crm.deal.add](../../../api-reference/crm/deals/crm-deal-add.md)
- Входящий вебхук со scope `crm`, созданный от имени пользователя с правом на редактирование этой сделки
- Установленный SDK для выбранного языка: `@bitrix24/b24jssdk`, `bitrix24/b24phpsdk:^3.0` или `b24pysdk`

Храните URL вебхука в переменной окружения, а не в исходном коде. Не добавляйте файл с секретом в систему контроля версий и не выводите значение вебхука в журнал.

В примерах используются переменные окружения:

- `B24_WEBHOOK_URL` — полный путь входящего вебхука для JavaScript и PHP
- `B24_DOMAIN` — домен Битрикс24 без `https://` для Python, например `company.bitrix24.ru`
- `B24_WEBHOOK_TOKEN` — часть пути `user_id/webhook_key` для Python
- `CRM_DEAL_ID` — идентификатор сделки

## 1. Найдем незакрытое универсальное дело

Чтобы обновить дело, нужны значения:

- `id` — идентификатор дела в таймлайне
- `ownerTypeId` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type), к которому привязано дело
- `ownerId` — идентификатор элемента CRM, к которому привязано дело
- `deadline` — текущий крайний срок дела, из которого возьмем время и часовой пояс для нового срока в формате [ISO 8601](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom)
- `title` — текущее название дела
- `responsibleId` — идентификатор ответственного за дело

Метод [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md) обновляет только незакрытые универсальные дела. Поэтому в [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) передадим фильтры `COMPLETED: 'N'` и `PROVIDER_ID: 'CRM_TODO'`.

В примере получим первое незакрытое универсальное дело, которое привязано к сделке `18`. Для сделки значение `OWNER_TYPE_ID` равно `2`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const webhookUrl = process.env.B24_WEBHOOK_URL
    const dealId = Number(process.env.CRM_DEAL_ID)

    if (!webhookUrl || !dealId) {
        throw new Error('Задайте B24_WEBHOOK_URL и CRM_DEAL_ID')
    }

    const $b24 = B24Hook.fromWebhookUrl(webhookUrl)

    const activityResponse = await $b24.actions.v2.call.make({
        method: 'crm.activity.list',
        params: {
            filter: {
                OWNER_TYPE_ID: 2,
                OWNER_ID: dealId,
                COMPLETED: 'N',
                PROVIDER_ID: 'CRM_TODO',
            },
            select: [
                'ID',
                'OWNER_TYPE_ID',
                'OWNER_ID',
                'SUBJECT',
                'DEADLINE',
                'COMPLETED',
                'RESPONSIBLE_ID',
                'PROVIDER_ID',
            ],
        },
        requestId: 'activity-list',
    })

    if (!activityResponse.isSuccess) {
        throw new Error(activityResponse.getErrorMessages().join('; '))
    }

    const activity = activityResponse.getData().result[0]

    if (!activity) {
        throw new Error('Незакрытые универсальные дела не найдены')
    }

    const activityId = Number(activity.ID)
    const ownerTypeId = Number(activity.OWNER_TYPE_ID)
    const ownerId = Number(activity.OWNER_ID)
    const currentDeadline = activity.DEADLINE
    const responsibleId = Number(activity.RESPONSIBLE_ID)
    const title = activity.SUBJECT

    console.log(activityId, ownerTypeId, ownerId, currentDeadline, responsibleId, title)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Exceptions\BaseException;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $webhookUrl = getenv('B24_WEBHOOK_URL');
    $dealId = (int)getenv('CRM_DEAL_ID');

    if (!$webhookUrl || !$dealId)
    {
        throw new RuntimeException('Задайте B24_WEBHOOK_URL и CRM_DEAL_ID');
    }

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook($webhookUrl);

    $activities = $sb->getCRMScope()->activity()->list(
        [],
        [
            'OWNER_TYPE_ID' => 2,
            'OWNER_ID' => $dealId,
            'COMPLETED' => 'N',
            'PROVIDER_ID' => 'CRM_TODO'
        ],
        [
            'ID',
            'OWNER_TYPE_ID',
            'OWNER_ID',
            'SUBJECT',
            'DEADLINE',
            'COMPLETED',
            'RESPONSIBLE_ID',
            'PROVIDER_ID'
        ],
        0
    )->getActivities();

    $activity = $activities[0] ?? null;

    if ($activity === null)
    {
        throw new RuntimeException('Незакрытые универсальные дела не найдены');
    }

    $activityId = $activity->ID;
    $ownerTypeId = $activity->OWNER_TYPE_ID;
    $ownerId = $activity->OWNER_ID;
    // DEADLINE типизирован в CarbonImmutable
    $currentDeadline = $activity->DEADLINE;
    $responsibleId = $activity->RESPONSIBLE_ID;
    $title = $activity->SUBJECT;
    ```

- Python

    ```python
    import os

    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain=os.environ["B24_DOMAIN"],
            webhook_token=os.environ["B24_WEBHOOK_TOKEN"],
        )
    )

    deal_id = int(os.environ["CRM_DEAL_ID"])

    activities = client.crm.activity.list(
        filter={
            "OWNER_TYPE_ID": 2,
            "OWNER_ID": deal_id,
            "COMPLETED": "N",
            "PROVIDER_ID": "CRM_TODO",
        },
        select=[
            "ID",
            "OWNER_TYPE_ID",
            "OWNER_ID",
            "SUBJECT",
            "DEADLINE",
            "COMPLETED",
            "RESPONSIBLE_ID",
            "PROVIDER_ID",
        ],
    ).response.result

    if not activities:
        raise RuntimeError("Незакрытые универсальные дела не найдены")

    activity = activities[0]
    activity_id = int(activity["ID"])
    owner_type_id = int(activity["OWNER_TYPE_ID"])
    owner_id = int(activity["OWNER_ID"])
    current_deadline = activity["DEADLINE"]
    responsible_id = int(activity["RESPONSIBLE_ID"])
    title = activity["SUBJECT"]
    ```
{% endlist %}

Из первого элемента массива `result` возьмите значения для обновления дела. Поле `ID` — идентификатор найденного дела. Ниже приведен сокращенный элемент ответа.

```json
{
    "ID": "555",
    "OWNER_TYPE_ID": "2",
    "OWNER_ID": "18",
    "SUBJECT": "Связаться с клиентом",
    "DEADLINE": "2026-08-14T10:00:00+03:00",
    "COMPLETED": "N",
    "RESPONSIBLE_ID": "1",
    "PROVIDER_ID": "CRM_TODO"
}
```

## 2. Обновим крайний срок дела

Метод [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md) обновляет универсальное дело. Для переноса дела на завтра передадим параметры:

- `id` — `555`, идентификатор найденного дела из поля `ID` ответа [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)
- `ownerTypeId` — `2`, идентификатор типа объекта CRM из поля `OWNER_TYPE_ID` предыдущего шага
- `ownerId` — `18`, идентификатор элемента CRM из поля `OWNER_ID` предыдущего шага
- `deadline` — новый крайний срок дела. Дату берем от завтрашнего дня, а время и часовой пояс переносим из `DEADLINE` предыдущего шага. Например, если код выполняется `2026-07-06`, значение `2026-08-14T10:00:00+03:00` станет `2026-07-07T10:00:00+03:00`
- `title` — `Связаться с клиентом`, название из поля `SUBJECT` предыдущего шага
- `responsibleId` — `1`, идентификатор ответственного сотрудника из поля `RESPONSIBLE_ID` предыдущего шага
- `pingOffsets` — `[0, 15]`, напоминания в момент наступления срока и за 15 минут до него
- `colorId` — `2`, цвет дела в таймлайне

{% list tabs %}

- JS

    ```js
    // Продолжение примера из шага 1

    function getTomorrowDeadlineWithSameTime(isoDateTime) {
        const dateTimeParts = isoDateTime.match(
            /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?)(Z|[+-]\d{2}:\d{2})$/
        )

        if (!dateTimeParts) {
            throw new Error('Некорректный формат даты')
        }

        const offset = dateTimeParts[2]
        const offsetMinutes = offset === 'Z'
            ? 0
            : (offset.startsWith('-') ? -1 : 1)
                * (Number(offset.slice(1, 3)) * 60 + Number(offset.slice(4, 6)))
        const tomorrow = new Date(Date.now() + offsetMinutes * 60_000)
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)

        const year = tomorrow.getUTCFullYear()
        const month = String(tomorrow.getUTCMonth() + 1).padStart(2, '0')
        const day = String(tomorrow.getUTCDate()).padStart(2, '0')

        return `${year}-${month}-${day}${dateTimeParts[1]}${offset}`
    }

    const deadline = getTomorrowDeadlineWithSameTime(currentDeadline)

    const updateResponse = await $b24.actions.v2.call.make({
        method: 'crm.activity.todo.update',
        params: {
            id: activityId,
            ownerTypeId,
            ownerId,
            deadline,
            title,
            responsibleId,
            pingOffsets: [0, 15],
            colorId: '2',
        },
        requestId: 'activity-todo-update',
    })

    if (!updateResponse.isSuccess) {
        console.error(updateResponse.getErrorMessages().join('; '))
    } else {
        console.log('Дело обновлено: ' + updateResponse.getData().result.id)
    }
    ```

- PHP

    ```php
    // Продолжение примера из шага 1

    $deadline = (new DateTimeImmutable('tomorrow', $currentDeadline->getTimezone()))
        ->setTime(
            (int)$currentDeadline->format('H'),
            (int)$currentDeadline->format('i'),
            (int)$currentDeadline->format('s')
        );

    try
    {
        // crm.activity.todo.update не имеет типизированной обертки — вызываем через core
        $result = $sb->core->call(
            'crm.activity.todo.update',
            [
                'id' => $activityId,
                'ownerTypeId' => $ownerTypeId,
                'ownerId' => $ownerId,
                'deadline' => $deadline->format(DateTimeInterface::ATOM),
                'title' => $title,
                'responsibleId' => $responsibleId,
                'pingOffsets' => [0, 15],
                'colorId' => '2'
            ]
        )->getResponseData()->getResult();

        echo 'Дело обновлено: ' . $result['id'];
    }
    catch (BaseException $exception)
    {
        echo 'Ошибка: ' . $exception->getMessage();
    }
    ```

- Python

    ```python
    # Продолжение примера из шага 1
    from datetime import datetime, timedelta

    from b24pysdk.errors import BitrixAPIError

    current_deadline_dt = datetime.fromisoformat(current_deadline)
    tomorrow = datetime.now(current_deadline_dt.tzinfo).date() + timedelta(days=1)
    deadline = datetime.combine(tomorrow, current_deadline_dt.timetz())

    try:
        response = client.crm.activity.todo.update(
            bitrix_id=activity_id,
            owner_type_id=owner_type_id,
            owner_id=owner_id,
            deadline=deadline,
            title=title,
            responsible_id=responsible_id,
            ping_offsets=[0, 15],
            color_id="2",
        ).response
        print(f"Дело обновлено: {response.result['id']}")
    except BitrixAPIError as error:
        print(f"Ошибка: {error}")
    ```
{% endlist %}

Если дело обновлено успешно, метод вернет идентификатор дела.

```json
{
    "result": {
        "id": 555
    }
}
```

## Проверим результат

Ответ `result.id = 555` подтверждает, что метод обновил дело с идентификатором `555`.

Проверьте результат одним из способов:

1. Откройте сделку из `CRM_DEAL_ID`. В таймлайне у найденного дела должны измениться крайний срок, цвет и напоминания
2. Повторно вызовите [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) с фильтром `ID: 555` и выберите поля `ID`, `DEADLINE`, `SUBJECT`, `RESPONSIBLE_ID` и `COMPLETED`. Поле `DEADLINE` должно содержать завтрашнюю дату с прежним временем и смещением часового пояса

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

- Список дел пуст — проверьте `CRM_DEAL_ID` и наличие незакрытого дела с `PROVIDER_ID = CRM_TODO`, затем повторите шаг 1
- Ошибка `CAN_NOT_UPDATE_COMPLETED_TODO` — дело закрыли после шага 1. Найдите другое незакрытое дело и повторите сценарий
- Ошибка `WRONG_DATETIME_FORMAT` — значение `deadline` не соответствует ISO 8601. Проверьте исходное поле `DEADLINE` и расчет новой даты
- Ошибка `NOT_FOUND` — элемент CRM не найден или выбранное дело создал другой провайдер. Проверьте `id`, `ownerTypeId`, `ownerId` и `PROVIDER_ID`, затем повторите шаг 1
- Ошибка `ACCESS_DENIED` — владелец вебхука не может редактировать сделку. Проверьте права этого пользователя
- Ошибка `OWNER_NOT_FOUND` — элемент CRM, к которому привязано дело, не найден. Проверьте `ownerTypeId` и `ownerId`

Если запрос не проходит авторизацию, проверьте, что переменные окружения заданы, вебхук активен и у него есть scope `crm`. Не выводите URL вебхука целиком при диагностике.

## Что важно учитывать

- Сценарий выбирает первое дело из ответа `crm.activity.list`. Если в сделке несколько универсальных дел, добавьте в фильтр известный `ID` или выберите нужное дело по полям ответа
- Дата «завтра» рассчитывается на момент запуска кода, а время и смещение часового пояса берутся из текущего `DEADLINE`
- Повторный запуск в тот же день обновит то же дело теми же значениями и не создаст новое дело
- Чтобы применить сценарий к лиду, контакту, компании или смарт-процессу, замените тип и идентификатор объекта в фильтре шага 1. Значения `OWNER_TYPE_ID` перечислены в статье [Типы объектов CRM](../../../api-reference/crm/data-types.md#object_type)

## Продолжите изучение

- [{#T}](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md)
- [{#T}](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)
- [{#T}](./how-to-move-activity.md)
