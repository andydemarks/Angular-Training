export interface MartianSol 
{
    photos:
    [
        {
            id:number,
            sol: number,
            camera:
            {
                full_name: string
            },
            img_src: string,
            earth_date: string,
            rover:
            {
                name: string
            }
        }
    ]
}

export interface MartianSolNoPhotos 
{

    id:number,
    sol: number,
    camera:
    {
        full_name: string
    },
    img_src: string,
    earth_date: string,
    rover:
    {
        name: string
    }

}
