# Бизнес-процессы и роботы: типовые сценарии

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Сценарий — это последовательность запросов для одной задачи. Сценарии помогают расширить автоматизацию Битрикс24 через REST API: добавить действие или робота приложения, встроить свой интерфейс в настройки робота, найти активные процессы и завершить неактуальные процессы.

Бизнес-процесс — это запущенная автоматизация по шаблону. Робот или действие — это шаг внутри автоматизации, который вызывает обработчик приложения, принимает параметры и может вернуть результат в процесс.

> Быстрый переход: [все сценарии](#choose-tutorial)
>
> Пользовательская документация: [Бизнес-процессы в Битрикс24](https://helpdesk.bitrix24.ru/open/21290220/)

## Связь с другими объектами

Сценарии связаны с роботами, действиями, заданиями, запущенными процессами, пользователями и интерфейсом приложения.

- **Роботы приложений.** Робот приложения добавляет шаг в CRM-автоматизацию, бизнес-процессы или умные сценарии. Для новой разработки рекомендуется выбирать роботов: они работают в CRM-автоматизации и бизнес-процессах. Зарегистрировать робота можно методом [bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md). Битрикс24 будет вызывать обработчик приложения каждый раз, когда автоматизация дойдет до шага с этим роботом
- **Действия приложений.** Действие приложения добавляет шаг в дизайнер бизнес-процессов. Оно подходит для уже существующих интеграций или сценариев, которые работают через шаблоны бизнес-процессов. Зарегистрировать действие можно методом [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md). Битрикс24 будет вызывать обработчик приложения, когда бизнес-процесс выполнит этот шаг
- **Обработчик приложения.** Обработчик — это публичный URL на стороне приложения. Битрикс24 отправляет на него данные, когда выполняет робота, действие или открывает встроенный интерфейс настроек
- **Параметры робота или действия.** Встроенный интерфейс приложения открывается в настройках робота или действия, если передать `USE_PLACEMENT` и `PLACEMENT_HANDLER` при регистрации или обновлении: [bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md), [bizproc.robot.update](../../api-reference/bizproc/bizproc-robot/bizproc-robot-update.md), [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md), [bizproc.activity.update](../../api-reference/bizproc/bizproc-activity/bizproc-activity-update.md). Значения параметров сохраняют вызовом [BX24.placement.call](../../api-reference/widgets/ui-interaction/bx24-placement-call.md)
- **Задания и запущенные процессы.** Задание бизнес-процесса хранит `WORKFLOW_ID` — идентификатор процесса, который создал задание. Задания пользователя можно получить методом [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md), активные процессы — методом [bizproc.workflow.instances](../../api-reference/bizproc/bizproc-workflow-instances.md). Чтобы остановить процесс и сохранить данные, используйте [bizproc.workflow.terminate](../../api-reference/bizproc/bizproc-workflow-terminate.md). Чтобы удалить процесс вместе со всеми данными процесса, используйте [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md)
- **Пользователи.** В сценарии с уволенным сотрудником метод [user.get](../../api-reference/user/user-get.md) помогает найти `ID` сотрудника. Этот идентификатор передают в фильтр `USER_ID` метода [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md), чтобы получить его невыполненные задания

## Как начать работу

1. Определите задачу: добавить автоматизацию, настроить интерфейс робота или завершить процессы
2. Выберите сценарий в таблице [Как выбрать сценарий](#choose-tutorial)
3. Проверьте, какие права и scopes указаны в выбранном сценарии
4. Подготовьте входные данные для сценария: публичный обработчик приложения, код робота или действия, дату фильтра или идентификатор пользователя
5. Выполните методы в порядке, который описан в сценарии
6. Проверьте результат: список роботов можно получить методом [bizproc.robot.list](../../api-reference/bizproc/bizproc-robot/bizproc-robot-list.md), список действий — методом [bizproc.activity.list](../../api-reference/bizproc/bizproc-activity/bizproc-activity-list.md), список активных процессов — методом [bizproc.workflow.instances](../../api-reference/bizproc/bizproc-workflow-instances.md)

## Как выбрать сценарий {#choose-tutorial}

#|
|| **Сценарий** | **Основные методы** | **Результат** ||
|| [Создать свое действие для бизнес-процесса](./how-to-create-custom-activity.md) | [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md), [bizproc.event.send](../../api-reference/bizproc/bizproc-robot/bizproc-event-send.md) | Действие приложения, которое возвращает результат в бизнес-процесс ||
|| [Создать смарт-счет на основании лида или сделки](./activity.md) | [bizproc.activity.add](../../api-reference/bizproc/bizproc-activity/bizproc-activity-add.md), [crm.item.get](../../api-reference/crm/universal/crm-item-get.md), [crm.item.productrow.list](../../api-reference/crm/universal/product-rows/crm-item-productrow-list.md), [crm.item.add](../../api-reference/crm/universal/crm-item-add.md), [crm.item.productrow.set](../../api-reference/crm/universal/product-rows/crm-item-productrow-set.md) | ID смарт-счета с клиентом и товарными позициями исходного лида или сделки ||
|| [Встроить свой UI в параметры робота](./setting-robot.md) | [bizproc.robot.add](../../api-reference/bizproc/bizproc-robot/bizproc-robot-add.md), [BX24.placement.call](../../api-reference/widgets/ui-interaction/bx24-placement-call.md), [bizproc.robot.list](../../api-reference/bizproc/bizproc-robot/bizproc-robot-list.md) | Робот с интерфейсом приложения для настройки и сохранения параметров ||
|| [Завершить бизнес-процессы уволенного сотрудника](./how-to-kill-workflows.md) | [user.get](../../api-reference/user/user-get.md), [bizproc.task.list](../../api-reference/bizproc/bizproc-task/bizproc-task-list.md), [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) | Удаление процессов, связанных с невыполненными заданиями сотрудника ||
|| [Массово завершить бизнес-процессы с фильтром по дате](./how-to-filter-and-kill-workflows.md) | [bizproc.workflow.instances](../../api-reference/bizproc/bizproc-workflow-instances.md), [bizproc.workflow.kill](../../api-reference/bizproc/bizproc-workflow-kill.md) | Удаление выбранных процессов, запущенных до указанной даты ||
|| [Посмотреть справочник методов бизнес-процессов и роботов](../../api-reference/bizproc/index.md) | Группы методов `bizproc.activity.*`, `bizproc.robot.*`, `bizproc.task.*`, `bizproc.workflow.*` | Выбор метода для собственного сценария автоматизации ||
|#
