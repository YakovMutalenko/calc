/**
 * Simplified logging
 */
const log = (...args: any[]) => { console.log(...args); return }

/**
 * - Yo, how's your thoughts on that?
 * - Irrationally optimistic.
 */
interface Decision {
    brainstorm(): string
}

/**
 * The most versatile man himself
 */
abstract class Manager {
    public abstract manage(): Decision
    public operate() {
        const decision = this.manage()
        return `Used myself to manage out some decision: ${decision.brainstorm()}`
    }
}

/**
 * Concrete decisions
 */
class SpecificDecision1 implements Decision {
    public brainstorm() {
        return 'decision1 - this one was straight up bad'
    }
}
class SpecificDecision2 implements Decision {
    public brainstorm() {
        return 'decision2 - wow, a suprisingly good idea!'
    }
}

/**
 * Much more narrow guys
 */
class SpecificManager1 extends Manager {
    public manage(): Decision {
        return new SpecificDecision1()
    }
}
class SpecificManager2 extends Manager {
    public manage(): Decision {
        return new SpecificDecision2()
    }
}

/**
 * the main code of the fictional app, won't think of a topic now, improvise
 * oh, got it: managers of team of: developers, designers, ...
 * one team, different people with different tasks, one manager:
 * developer/code decision, design decisions, etc.
 */

const run = (manager: Manager) => {
    log('idk, it\'s 03:00')
    log('run this hot garbo: ', manager.operate())
}

log('run the app with a specific master/creator/manager №1')
run(new SpecificManager1())

log()

log('run the app with a specific master/creator/... №2')
run(new SpecificManager2)
