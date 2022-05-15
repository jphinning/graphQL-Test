import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Movie } from "../entities/MovieEntity";

@Resolver()
export class MovieResolver {
  @Mutation(() => Boolean)
  async createMovie(
    @Arg("title") title: string,
    @Arg("minutes", () => Int) minutes: number
  ) {
    await Movie.insert({ title, minutes });
    return true;
  }

  @Query(() => [Movie])
  findAll() {
    return Movie.find();
  }
}
