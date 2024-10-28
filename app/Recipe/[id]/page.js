import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackButton from '../../components/BackButton';
import { fetchRecipeById } from '../../api';
import ImageGallery from '../../components/ImageGallery';
import CollapsibleSection from '../../components/CollapsibleSection';
import dynamic from 'next/dynamic';
import Loading from '../../components/loading'; // Importing the Loading component

//Generate metadata for the recipe page dynamically
export async function generateMetadata({ params }) {
    const { id } = params;
    const { recipe, error } = await fetchRecipeById(id);

    if (error || !recipe) {
        return {
            title: 'Recipe not found',
            description: 'Error occurred while fetching the recipe.'
        };
    }

    return {
        title: recipe.title || 'Untitled Recipe',
        description: recipe.description || 'No description available.',
        openGraph: {
            title: recipe.title || 'Untitled Recipe',
            description: recipe.description || 'No description available.',
            images: recipe.images?.[0] || '/kwaMai.jpg',
            type: 'article'
        }
    };
}

// Main Recipe Page Component
export default async function RecipePage({ params }) {
    const { id } = params;
    let recipe;
    let load = true;
    let error = null;

    try{
        recipe = await fetchRecipeById(id);
    }catch(error){
        console.error('Error fetching recipe:', error);
        error = 'Failed to load recipe data.';
    }finally{
        load = false;
    };

    if(load){
        <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
            <Loading /> {/* Use your Loading component here */}
        </div>
    }

    if (error) {
        throw error;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Back Button */}
                <div className="mb-8">
                    <BackButton />
                </div>

                <div className="space-y-8">
                    {/* Image Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden">
                        <Suspense fallback={<Loading />}> {/* Use the Loading component here */}
                            {recipe.images && recipe.images.length > 0 ? (
                                <ImageGallery images={recipe.images} />
                            ) : recipe.images?.[0] ? (
                                <Image
                                    src={recipe.images[0]}
                                    alt={recipe.title || 'Recipe Image'}
                                    width={300}
                                    height={200}
                                    className="w-full h-[400px] object-cover rounded-xl"
                                />
                            ) : (
                                <div className="w-full h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
                                    <p className="text-gray-500">No image available</p>
                                </div>
                            )}
                        </Suspense>
                    </div>

                    {/* Title and Tags Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h1 className="text-4xl font-bold text-green-800 mb-4">
                            {recipe.title || 'Untitled Recipe'}
                        </h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {recipe.tags?.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Collapsible Sections */}
                    <CollapsibleSection
                        title="Description"
                        content={recipe.description || 'No description available.'}
                        defaultOpen={true}
                    />

                    <CollapsibleSection
                        title="Ingredients"
                        content={
                            <ul className="list-disc list-inside">
                                {Object.entries(recipe.ingredients || {}).map(([key, value], index) => (
                                    <li key={index}>
                                        {key}: {value}
                                    </li>
                                ))}
                            </ul>
                        }
                        defaultOpen={true}
                    />

                    <CollapsibleSection
                        title="Nutrition"
                        content={
                            <ul className="list-disc list-inside">
                                {Object.entries(recipe.nutrition || {}).map(([key, value], index) => (
                                    <li key={index}>
                                        {key}: {value}
                                    </li>
                                ))}
                            </ul>
                        }
                        defaultOpen={true}
                    />

                    <CollapsibleSection
                        title="Instructions"
                        content={recipe.instructions || 'No instructions available.'}
                        defaultOpen={true}
                    />

                    {/* Footer Information */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow-xl">
                        <p className="text-sm text-green-600">
                            <strong>Published:</strong> {new Date(recipe.published).toDateString()}
                        </p>
                        <p className="text-sm">
                            <strong className="text-green-600">Prep Time:</strong> {recipe.prep} minutes
                        </p>
                        <p className="text-sm">
                            <strong className="text-green-600">Cook Time:</strong> {recipe.cook} minutes
                        </p>
                        <p className="text-sm">
                            <strong className="text-green-600">Servings:</strong> {recipe.servings}
                        </p>
                        <p className="text-sm">
                            <strong className="text-green-600">Category:</strong> {recipe.category}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
