const StepanPromise = require('./promise')

describe('StepanPromise: ', () => {

    let promise
    let ex
    let successResult = 23
    const errorRes = 'error'

    beforeEach(() => {
        ex = jest.fn((r) => setTimeout(() => r(successResult), 150))
        promise = new StepanPromise(ex)
    })


    test('must exist and be typeof function', () => {
        expect(StepanPromise).toBeDefined()
        expect(typeof StepanPromise).toBe('function')
    })

    test('instance must have methods', () => {
        expect(promise.then).not.toBeUndefined()
        expect(promise.catch).not.toBeUndefined()
        expect(promise.finally).not.toBeUndefined()
    })

    test('SP must call executor', () => {

        expect(ex).toHaveBeenCalled()
    })

    test('SP must get then several times', async () => {
        const result = await promise.then(n => n).then(n => n * 2)

        expect(result).toBe(successResult * 2)
    })

    test('must catch error', () => {
        const exError = (_, r) => setTimeout(() => {
            r(errorRes)
        }, 150)

        const errorPromise = new StepanPromise(exError)

        return new Promise(resolve => {
            errorPromise.catch(error => {
                expect(error).toBe(errorRes)
                resolve()

            })
        })
    })

    test('must call finally', async () => {
        const finSpy = jest.fn(() => { })
        await promise.finally(finSpy)

        expect(finSpy).toHaveBeenCalled()
    })

})