# Поля Follow-up звонков

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Follow-up звонка содержит метаданные звонка, участников, записи и AI-блоки: транскрипцию, обзор, саммари, инсайты и оценку эффективности.

Поля можно передавать в параметре `select` методов [call.followup.list](./call-followup-list.md) и [call.followup.get](./call-followup-get.md).

## Какие поля можно передать в select {#select-paths}

В `select` можно передать поля [корневого объекта](#root-object) и доступные вложенные пути AI-блоков:

- `transcription`, `transcription.language`, `transcription.segments`
- `overview`, `overview.topic`, `overview.detailedTakeaways`, `overview.meetingType`, `overview.agenda`, `overview.agreements`, `overview.actionItems`, `overview.meetings`
- `summary`
- `insights`, `insights.speakerEvaluationAvailable`, `insights.speakerAnalysis`, `insights.meetingStrengths`, `insights.meetingWeaknesses`, `insights.speechStyleInfluence`, `insights.engagementLevel`, `insights.areasOfResponsibility`, `insights.finalRecommendations`
- `evaluation`, `evaluation.efficiencyValue`, `evaluation.calendar`, `evaluation.criteria`

Нельзя передавать в `select` поля внутри элементов массивов. Например, вместо `participants.name` передайте `participants`, вместо `overview.actionItems.actionItem` передайте `overview.actionItems`. Метод вернет весь массив с доступными полями.

## Корневой объект {#root-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **callId**
[`integer`](../../data-types.md) | Идентификатор звонка ||
|| **callType**
[`integer`](../../data-types.md) | Тип звонка:

- `1` — мгновенный звонок
- `2` — постоянная конференция
- `3` — большая комната ||
|| **initiatorId**
[`integer`](../../data-types.md) | Идентификатор пользователя, который начал звонок ||
|| **startDate**
[`string`](../../data-types.md) | Дата начала звонка в формате ISO 8601 ||
|| **endDate**
[`string`](../../data-types.md) | Дата окончания звонка в формате ISO 8601. Если звонок еще идет, значение равно `null` ||
|| **durationSeconds**
[`integer`](../../data-types.md) | Длительность звонка в секундах ||
|| **uuid**
[`string`](../../data-types.md) | UUID сессии звонка ||
|| **language**
[`string`](../../data-types.md) | Код языка транскрипции, например `ru` или `en` ||
|| **version**
[`integer`](../../data-types.md) | Максимальная версия схемы среди сохраненных AI-блоков ||
|| **participants**
[`array`](../../data-types.md) | Участники звонка [(подробное описание)](#participant) ||
|| **outcomes**
[`array`](../../data-types.md) | Список готовых AI-блоков:

- `transcription` — транскрипция звонка
- `overview` — обзор встречи
- `summary` — саммари звонка
- `insights` — инсайты и анализ спикеров
- `evaluation` — оценка эффективности встречи ||
|| **createdAt**
[`string`](../../data-types.md) | Дата последней AI-записи по звонку в формате ISO 8601 ||
|| **tracks**
[`array`](../../data-types.md) | Записи звонка [(подробное описание)](#track) ||
|| **transcription**
[`object`](../../data-types.md) | Транскрипция звонка [(подробное описание)](#transcription) ||
|| **overview**
[`object`](../../data-types.md) | Обзор встречи [(подробное описание)](#overview) ||
|| **summary**
[`object`](../../data-types.md) | Сегментированное саммари звонка [(подробное описание)](#summary) ||
|| **insights**
[`object`](../../data-types.md) | Инсайты и анализ спикеров [(подробное описание)](#insights) ||
|| **evaluation**
[`object`](../../data-types.md) | Оценка эффективности встречи [(подробное описание)](#evaluation) ||
|#

## Объект participants[] {#participant}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **talkedSeconds**
[`integer`](../../data-types.md) | Время участия пользователя в звонке в секундах ||
|| **name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **avatar**
[`string`](../../data-types.md) | URL аватара пользователя ||
|| **workPosition**
[`string`](../../data-types.md) | Должность пользователя ||
|#

## Объект tracks[] {#track}

#|
|| **Название**
`тип` | **Описание** ||
|| **trackId**
[`integer`](../../data-types.md) | Идентификатор записи звонка ||
|| **type**
[`string`](../../data-types.md) | Тип записи ||
|| **fileId**
[`integer`](../../data-types.md) | Идентификатор файла ||
|| **diskFileId**
[`integer`](../../data-types.md) | Идентификатор файла на Диске ||
|| **duration**
[`integer`](../../data-types.md) | Длительность записи в секундах ||
|| **fileSize**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **fileName**
[`string`](../../data-types.md) | Имя файла ||
|| **mimeType**
[`string`](../../data-types.md) | MIME-тип файла ||
|| **callId**
[`integer`](../../data-types.md) | Идентификатор звонка ||
|| **relUrl**
[`string`](../../data-types.md) | Относительный URL файла ||
|| **url**
[`string`](../../data-types.md) | Абсолютный URL файла ||
|| **dateCreate**
[`string`](../../data-types.md) | Дата регистрации записи в формате ISO 8601 ||
|#

## Объект transcription {#transcription}

#|
|| **Название**
`тип` | **Описание** ||
|| **language**
[`string`](../../data-types.md) | Код языка транскрипции ||
|| **segments**
[`array`](../../data-types.md) | Реплики в хронологическом порядке [(подробное описание)](#transcription-segment) ||
|#

### Объект transcription.segments[] {#transcription-segment}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя, который произнес реплику ||
|| **userName**
[`string`](../../data-types.md) | Имя пользователя ||
|| **start**
[`string`](../../data-types.md) | Время начала реплики относительно начала звонка в формате `HH:MM:SS` ||
|| **end**
[`string`](../../data-types.md) | Время окончания реплики относительно начала звонка в формате `HH:MM:SS` ||
|| **text**
[`string`](../../data-types.md) | Текст реплики. Формат упоминаний зависит от параметра `mentionFormat` ||
|#

## Объект overview {#overview}

#|
|| **Название**
`тип` | **Описание** ||
|| **topic**
[`string`](../../data-types.md) | Краткая тема встречи ||
|| **detailedTakeaways**
[`string`](../../data-types.md) | Развернутые итоги встречи ||
|| **meetingType**
[`object`](../../data-types.md) | Тип встречи:

- `explanation` — объяснение типа встречи
- `typeTag` — код типа встречи
- `title` — название типа встречи ||
|| **agenda**
[`object`](../../data-types.md) | Повестка встречи:

- `explanation` — описание повестки
- `quote` — цитата из звонка ||
|| **agreements**
[`array`](../../data-types.md) | Договоренности. Каждый элемент может содержать:

- `agreement` — текст договоренности
- `quote` — цитату из звонка ||
|| **actionItems**
[`array`](../../data-types.md) | Действия по итогам встречи. Каждый элемент может содержать:

- `actionItem` — действие с упоминаниями участников
- `actionItemMentionLess` — действие без упоминаний участников
- `quote` — цитату из звонка ||
|| **meetings**
[`array`](../../data-types.md) | Запланированные последующие встречи. Каждый элемент может содержать:

- `meeting` — описание встречи с упоминаниями участников
- `meetingMentionLess` — описание встречи без упоминаний участников
- `quote` — цитату из звонка ||
|#

## Объект summary {#summary}

#|
|| **Название**
`тип` | **Описание** ||
|| **segments**
[`array`](../../data-types.md) | Сегменты саммари [(подробное описание)](#summary-segment) ||
|#

### Объект summary.segments[] {#summary-segment}

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`string`](../../data-types.md) | Время начала сегмента относительно начала звонка в формате `HH:MM:SS` ||
|| **end**
[`string`](../../data-types.md) | Время окончания сегмента относительно начала звонка в формате `HH:MM:SS` ||
|| **title**
[`string`](../../data-types.md) | Заголовок сегмента ||
|| **summary**
[`string`](../../data-types.md) | Саммари сегмента ||
|#

## Объект insights {#insights}

#|
|| **Название**
`тип` | **Описание** ||
|| **speakerEvaluationAvailable**
[`boolean`](../../data-types.md) | Доступна ли оценка спикеров. Для регионов вне CIS значение равно `false` ||
|| **speakerAnalysis**
[`array`](../../data-types.md) | Анализ по спикерам [(подробное описание)](#speaker-analysis). Элементы отсортированы по доле речи и оценке эффективности ||
|| **meetingStrengths**
[`array`](../../data-types.md) | Сильные стороны встречи. Каждый элемент содержит:

- `strengthTitle` — название сильной стороны
- `strengthExplanation` — объяснение сильной стороны ||
|| **meetingWeaknesses**
[`array`](../../data-types.md) | Слабые стороны встречи. Каждый элемент содержит:

- `weaknessTitle` — название слабой стороны
- `weaknessExplanation` — объяснение слабой стороны ||
|| **speechStyleInfluence**
[`string`](../../data-types.md) | Оценка влияния стиля коммуникации на результат встречи ||
|| **engagementLevel**
[`string`](../../data-types.md) | Оценка вовлеченности участников ||
|| **areasOfResponsibility**
[`string`](../../data-types.md) | Области ответственности, определенные по итогам встречи ||
|| **finalRecommendations**
[`string`](../../data-types.md) | Рекомендации для следующих встреч ||
|#

### Объект insights.speakerAnalysis[] {#speaker-analysis}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **detailedInsight**
[`string`](../../data-types.md) | Подробный анализ участия спикера ||
|| **efficiencyValue**
[`integer`](../../data-types.md) | Оценка эффективности спикера от `0` до `100` ||
|| **evaluationCriteria**
[`object`](../../data-types.md) | Карта критериев оценки. Ключ — код критерия, значение — объект с полями:

- `value` — результат проверки критерия, булево значение
- `criteria` — описание критерия
- `title` — название критерия ||
|| **talkPercentage**
[`integer`](../../data-types.md) | Доля речи спикера в процентах. Поле добавляется по данным транскрипции ||
|| **duration**
[`integer`](../../data-types.md) | Длительность речи спикера в секундах. Поле добавляется по данным транскрипции ||
|| **durationFormat**
[`string`](../../data-types.md) | Отформатированная длительность речи спикера. Поле добавляется по данным транскрипции ||
|#

## Объект evaluation {#evaluation}

#|
|| **Название**
`тип` | **Описание** ||
|| **efficiencyValue**
[`integer`](../../data-types.md) | Общая оценка эффективности встречи от `0` до `100` ||
|| **calendar**
[`object`](../../data-types.md) | Оценка календарного планирования. Содержит поле:

- `overhead` — встреча вышла за запланированное время, булево значение ||
|| **criteria**
[`object`](../../data-types.md) | Карта критериев оценки. Ключ — код критерия, значение — объект с полями:

- `value` — результат проверки критерия, булево значение
- `criteria` — описание критерия
- `thoughts` — пояснение оценки
- `title` — название критерия ||
|#
