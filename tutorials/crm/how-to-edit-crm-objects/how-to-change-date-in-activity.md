# Как перенести запланированное дело на другую дату

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на редактирование элемента CRM, для которого обновляется дело

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Запланированное дело помогает ответственному сотруднику не пропустить следующий шаг по клиенту: позвонить, написать письмо или подготовить документы. Если срок изменился, нужно обновить крайний срок дела в таймлайне CRM.

Например, перенесем запланированное дело на завтра: дату крайнего срока изменим, а время оставим таким же. Также укажем название и добавим напоминания за 15 минут до срока и в момент наступления срока.

Для переноса дела используем метод [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md). В него нужно передать идентификатор дела и элемент CRM, к которому дело привязано.

Сценарий состоит из двух шагов.

1. Найти незакрытое дело методом [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md).
2. Передать данные дела в метод [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md) и обновить крайний срок.

## 1. Подготовим данные

Чтобы обновить дело, нужны значения:

- `id` — идентификатор дела в таймлайне,
- `ownerTypeId` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type), к которому привязано дело,
- `ownerId` — идентификатор элемента CRM, к которому привязано дело,
- `deadline` — текущий крайний срок дела, из которого возьмем время и часовой пояс для нового срока в формате [ISO 8601](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom).

Метод [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md) не обновляет закрытые дела. Чтобы получить незакрытое дело, вызовите метод [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md) с фильтром `COMPLETED: 'N'`.

В примере получим первое незакрытое дело, которое привязано к сделке `18`. Для сделки значение `OWNER_TYPE_ID` равно `2`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/')

    const dealId = 18

    const activityResponse = await $b24.actions.v2.call.make({
        method: 'crm.activity.list',
        params: {
            filter: {
                OWNER_TYPE_ID: 2,
                OWNER_ID: dealId,
                COMPLETED: 'N',
            },
            select: [
                'ID',
                'OWNER_TYPE_ID',
                'OWNER_ID',
                'SUBJECT',
                'DEADLINE',
                'COMPLETED',
                'RESPONSIBLE_ID',
            ],
        },
        requestId: 'activity-list',
    })

    if (!activityResponse.isSuccess) {
        throw new Error(activityResponse.getErrorMessages().join('; '))
    }

    const activity = activityResponse.getData().result[0]

    if (!activity) {
        console.log('Незакрытые дела не найдены')
    } else {
        const activityId = Number(activity.ID)
        const ownerTypeId = Number(activity.OWNER_TYPE_ID)
        const ownerId = Number(activity.OWNER_ID)
        const currentDeadline = activity.DEADLINE
        const responsibleId = Number(activity.RESPONSIBLE_ID)

        console.log(activityId, ownerTypeId, ownerId, currentDeadline, responsibleId)
    }
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $dealId = 18;

    $activities = $sb->getCRMScope()->activity()->list(
        [],
        [
            'OWNER_TYPE_ID' => 2,
            'OWNER_ID' => $dealId,
            'COMPLETED' => 'N'
        ],
        [
            'ID',
            'OWNER_TYPE_ID',
            'OWNER_ID',
            'SUBJECT',
            'DEADLINE',
            'COMPLETED',
            'RESPONSIBLE_ID'
        ],
        0
    )->getActivities();

    $activity = $activities[0] ?? null;

    if ($activity === null)
    {
        echo 'Незакрытые дела не найдены';
        return;
    }

    $activityId = $activity->ID;
    $ownerTypeId = $activity->OWNER_TYPE_ID;
    $ownerId = $activity->OWNER_ID;
    // DEADLINE типизирован в CarbonImmutable
    $currentDeadline = $activity->DEADLINE;
    $responsibleId = $activity->RESPONSIBLE_ID;
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    deal_id = 18

    activities = client.crm.activity.list(
        filter={
            "OWNER_TYPE_ID": 2,
            "OWNER_ID": deal_id,
            "COMPLETED": "N",
        },
        select=[
            "ID",
            "OWNER_TYPE_ID",
            "OWNER_ID",
            "SUBJECT",
            "DEADLINE",
            "COMPLETED",
            "RESPONSIBLE_ID",
        ],
    ).response.result

    if not activities:
        print("Незакрытые дела не найдены")
        raise SystemExit

    activity = activities[0]
    activity_id = int(activity["ID"])
    owner_type_id = int(activity["OWNER_TYPE_ID"])
    owner_id = int(activity["OWNER_ID"])
    current_deadline = activity["DEADLINE"]
    responsible_id = int(activity["RESPONSIBLE_ID"])
    ```

{% endlist %}

Из первого элемента массива `result` возьмите значения для обновления дела. Поле `ID` — идентификатор найденного дела.

```json
{
    "ID": "555",
    "OWNER_TYPE_ID": "2",
    "OWNER_ID": "18",
    "SUBJECT": "Связаться с клиентом",
    "DEADLINE": "2026-08-14T10:00:00+03:00",
    "COMPLETED": "N",
    "RESPONSIBLE_ID": "1"
}
```

## 2. Обновим крайний срок дела

Метод [crm.activity.todo.update](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md) обновляет универсальное дело. Для переноса дела на завтра передадим параметры:

- `id` — `555`, идентификатор найденного дела из поля `ID` ответа [crm.activity.list](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md).
- `ownerTypeId` — `2`, идентификатор типа объекта CRM из поля `OWNER_TYPE_ID` предыдущего шага.
- `ownerId` — `18`, идентификатор элемента CRM из поля `OWNER_ID` предыдущего шага.
- `deadline` — новый крайний срок дела. Дату берем от завтрашнего дня, а время и часовой пояс переносим из `DEADLINE` предыдущего шага. Например, если код выполняется `2026-07-06`, значение `2026-08-14T10:00:00+03:00` станет `2026-07-07T10:00:00+03:00`.
- `title` — `Связаться с клиентом`, название дела.
- `responsibleId` — `1`, идентификатор ответственного сотрудника из поля `RESPONSIBLE_ID` предыдущего шага.
- `pingOffsets` — `[0, 15]`, напоминания в момент наступления срока и за 15 минут до него.
- `colorId` — `2`, цвет дела в таймлайне.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/')

    const activityId = 555;
    const ownerTypeId = 2;
    const ownerId = 18;
    const responsibleId = 1;
    const currentDeadline = '2026-08-14T10:00:00+03:00';

    function getTomorrowDeadlineWithSameTime(isoDateTime) {
        const dateTimeParts = isoDateTime.match(/^\d{4}-\d{2}-\d{2}(T.+)$/);

        if (!dateTimeParts) {
            throw new Error('Некорректный формат даты');
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}${dateTimeParts[1]}`;
    }

    const deadline = getTomorrowDeadlineWithSameTime(currentDeadline);

    const updateResponse = await $b24.actions.v2.call.make({
        method: 'crm.activity.todo.update',
        params: {
            id: activityId,
            ownerTypeId: ownerTypeId,
            ownerId: ownerId,
            deadline: deadline,
            title: 'Связаться с клиентом',
            responsibleId: responsibleId,
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
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Exceptions\BaseException;
    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Monolog\Logger;
    use Monolog\Handler\StreamHandler;

    $log = new Logger('b24');
    $log->pushHandler(new StreamHandler('php://stdout'));

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), $log))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $activityId = 555;
    $ownerTypeId = 2;
    $ownerId = 18;
    $responsibleId = 1;
    $currentDeadline = '2026-08-14T10:00:00+03:00';

    $currentDeadlineDate = new DateTime($currentDeadline);
    $deadline = new DateTime('tomorrow', $currentDeadlineDate->getTimezone());
    $deadline->setTime(
        (int)$currentDeadlineDate->format('H'),
        (int)$currentDeadlineDate->format('i'),
        (int)$currentDeadlineDate->format('s')
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
                'title' => 'Связаться с клиентом',
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
    from datetime import datetime, timedelta

    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError

    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    activity_id = 555
    owner_type_id = 2
    owner_id = 18
    responsible_id = 1
    current_deadline = datetime.fromisoformat("2026-08-14T10:00:00+03:00")
    tomorrow = datetime.now(current_deadline.tzinfo).date() + timedelta(days=1)
    deadline = datetime.combine(tomorrow, current_deadline.timetz())

    try:
        response = client.crm.activity.todo.update(
            bitrix_id=activity_id,
            owner_type_id=owner_type_id,
            owner_id=owner_id,
            deadline=deadline,
            title="Связаться с клиентом",
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

Откройте элемент CRM, к которому привязано дело. В таймлайне изменится крайний срок дела. Если указаны `pingOffsets`, Битрикс24 создаст напоминания относительно нового срока.

Если метод вернул ошибку, проверьте данные запроса.

- `CAN_NOT_UPDATE_COMPLETED_TODO` — дело уже закрыто. Закрытые дела нельзя изменять.
- `WRONG_DATETIME_FORMAT` — значение `deadline` передано в некорректном формате.
- `NOT_FOUND` — элемент CRM или дело не найдены. Проверьте `id`, `ownerTypeId` и `ownerId`.
- `ACCESS_DENIED` — у пользователя нет прав на изменение элемента CRM.
- `OWNER_NOT_FOUND` — элемент CRM, к которому привязано дело, не найден.

## Продолжите изучение

- [{#T}](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-update.md)
- [{#T}](../../../api-reference/crm/timeline/activities/todo/crm-activity-todo-add.md)
- [{#T}](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-list.md)
- [{#T}](./how-to-move-activity.md)
